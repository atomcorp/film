import {auth} from '../../firebase/firebase';
import {addToLocalStorage} from '../../helpers/localstorage';

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

const signUpAttempt = () => ({
  type: SIGN_UP.ATTEMPT,
});

const signUpSuccess = ({email, name = 'default'}) => ({
  type: SIGN_UP.SUCCESS,
  email,
  name,
});

const signUpFail = ({message}) => ({
  type: SIGN_UP.FAIL,
  message,
});

export const signUp = ({email, password}) => {
  return (dispatch, getState) => {
    dispatch(signUpAttempt());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(signUpSuccess({email}));
        // then signIn?
      })
      .catch((err) => dispatch(signUpFail({message: err.message})));
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
        addToLocalStorage(SIGN_IN.SUCCESS, user.uid);
      })
      .catch((err) => dispatch(signInFail({message: err.message})));
  };
};
