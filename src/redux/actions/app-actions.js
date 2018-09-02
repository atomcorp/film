import {usersPath} from '../../config/paths';
import {auth, database} from '../../firebase/firebase';
import {clearFromLocalStorage} from '../../helpers/localstorage';
import tryAction from '../../helpers/tryAction';
import {validateUsername} from '../../helpers/validateUsername';

export const SIGN_IN_TO_FIREBASE = tryAction('SIGN_IN_TO_FIREBASE');
export const SIGN_OUT = tryAction('SIGN_OUT');
export const SIGN_UP = tryAction('SIGN_UP');
export const INIT_USER = tryAction('INIT_USER');
export const INIT_APP_DONE = 'INIT_APP_DONE';

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
          // then signInToFirebase?
        })
        .catch((err) => dispatch(signUpFail({message: err.message})));
    }
  };
};

export const signInToFirebaseAttempt = () => ({
  type: SIGN_IN_TO_FIREBASE.ATTEMPT,
});

export const signInToFirebaseSuccess = () => ({
  type: SIGN_IN_TO_FIREBASE.SUCCESS,
});

const signInToFirebaseFail = ({message}) => ({
  type: SIGN_IN_TO_FIREBASE.FAIL,
  message,
});

export const signInToFirebase = ({email, password}) => {
  return (dispatch, getState) => {
    dispatch(signInToFirebaseAttempt());
    // this logs into Firebase
    // if successful it triggers auth.onAuthStateChanged
    // in the store.js
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      dispatch(signInToFirebaseFail({message: err.message}));
    });
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

export const initAppDone = () => ({
  type: INIT_APP_DONE,
});
