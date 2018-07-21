import {auth, database} from '../../firebase/firebase';
import {
  addToLocalStorage,
  clearFromLocalStorage,
} from '../../helpers/localstorage';
import {validateUsername} from '../../helpers/validateUsername';

export const SIGN_IN = {
  ATTEMPT: 'SIGN_IN_ATTEMPT',
  SUCCESS: 'SIGN_IN_SUCCESS',
  FAIL: 'SIGN_IN_FAIL',
};
export const SIGN_OUT = {
  ATTEMPT: 'SIGN_OUT_ATTEMPT',
  SUCCESS: 'SIGN_OUT_SUCCESS',
  FAIL: 'SIGN_OUT_FAIL',
};
export const SIGN_UP = {
  ATTEMPT: 'SIGN_UP_ATTEMPT',
  SUCCESS: 'SIGN_UP_SUCCESS',
  FAIL: 'SIGN_UP_FAIL',
};

export const INIT_USER = {
  ATTEMPT: 'INIT_USER_ATTEMPT',
  SUCCESS: 'INIT_USER_SUCCESS',
  FAIL: 'INIT_USER_FAIL',
};

const signUpAttempt = () => ({
  type: SIGN_UP.ATTEMPT,
});

const signUpSuccess = () => ({
  type: SIGN_UP.SUCCESS,
});

const signUpFail = ({message}) => ({
  type: SIGN_UP.FAIL,
  message,
});

export const signUp = ({email, password, name}) => {
  return (dispatch, getState) => {
    dispatch(signUpAttempt());
    // First we validate the username
    const username = validateUsername(name);
    if (!username.isValid) {
      dispatch(signUpFail({message: username.error}));
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
          // console.log(user);
          dispatch(signUpSuccess());
          // set up a database entry
          dispatch(initUser({id: user.uid, name, email}));
          // then signIn?
        })
        .catch((err) => dispatch(signUpFail({message: err.message})));
    }
  };
};

const signInAttempt = () => ({
  type: SIGN_IN.ATTEMPT,
});

const signInSuccess = ({id}) => ({
  type: SIGN_IN.SUCCESS,
  id,
});

const signInFail = ({message}) => ({
  type: SIGN_IN.FAIL,
  message,
});

export const signIn = ({email, password}) => {
  return (dispatch, getState) => {
    dispatch(signInAttempt());
    auth
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(signInSuccess({id: user.uid}));
        // then download user data
        addToLocalStorage('id', user.uid);
      })
      .catch((err) => dispatch(signInFail({message: err.message})));
  };
};

const signOutAttempt = () => ({
  type: SIGN_OUT.ATTEMPT,
});

const signOutSuccess = () => ({
  type: SIGN_OUT.SUCCESS,
});

export const signOut = () => {
  return (dispatch) => {
    dispatch(signOutAttempt());
    return auth.signOut().then(() => {
      clearFromLocalStorage('id');
      return dispatch(signOutSuccess());
    });
  };
};

const initUserAttempt = () => ({
  type: INIT_USER.ATTEMPT,
});

const initUserSuccess = ({id, email, name}) => ({
  type: INIT_USER.SUCCESS,
  id,
  email,
  name,
});

const initUserFail = ({message}) => ({
  type: INIT_USER.FAIL,
  message,
});

export const initUser = ({id, name, email}) => {
  return (dispatch, getState) => {
    dispatch(initUserAttempt());
    database
      .ref(`users/${id}`)
      .set({
        id,
        name,
        email,
      })
      .then(() => {
        dispatch(initUserSuccess({id, name, email}));
      })
      .catch((error) => {
        dispatch(initUserFail({message: error.message}));
      });
  };
};
