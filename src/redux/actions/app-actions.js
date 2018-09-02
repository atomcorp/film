import {auth, database} from '../../firebase/firebase';
import {usersPath} from '../../config/paths';
import {getUserData} from './user-actions';
import tryAction from '../../helpers/tryAction';
import {
  addToLocalStorage,
  clearFromLocalStorage,
} from '../../helpers/localstorage';
import {validateUsername} from '../../helpers/validateUsername';

export const SIGN_IN = tryAction('SIGN_IN');
export const SIGN_OUT = tryAction('SIGN_OUT');
export const SIGN_UP = tryAction('SIGN_UP');
export const INIT_USER = tryAction('INIT_USER');

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

export const signInSuccess = () => ({
  type: SIGN_IN.SUCCESS,
});

const signInFail = ({message}) => ({
  type: SIGN_IN.FAIL,
  message,
});

export const signIn = ({email, password}) => {
  return (dispatch, getState) => {
    dispatch(signInAttempt());
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({user}) => {
        dispatch(signInSuccess());
        addToLocalStorage('id', user.uid);
        return user;
      })
      .then((user) => {
        dispatch(getUserData({id: user.uid}));
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
      .ref(`${usersPath}/${id}`)
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
