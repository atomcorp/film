import {database} from '../../firebase/firebase';
import {usersPath} from '../../config/paths';
import tryAction from '../../helpers/tryAction';
import {setAuth} from './auth-actions';
import {initAppFinish} from './app-actions';
export const GET_USER_DATA = tryAction('GET_USER_DATA');
export const SET_USER_DATA = tryAction('SET_USER_DATA');

const getUserDataAttempt = () => ({
  type: GET_USER_DATA.ATTEMPT,
});

const getUserDataSuccess = ({userData}) => ({
  type: GET_USER_DATA.SUCCESS,
  userData,
});

const getUserDataFail = ({message}) => ({
  type: GET_USER_DATA.FAIL,
  message,
});

export const getUserData = ({id}) => {
  return (dispatch, getState) => {
    dispatch(getUserDataAttempt());
    database
      .ref(`${usersPath}/${id}`)
      .once('value')
      .then((snapshot) => {
        if (!snapshot.val()) {
          throw new Error('No user');
        }
        /* eslint-disable no-console */
        dispatch(getUserDataSuccess({userData: snapshot.val()}));
      })
      .then(() => {
        dispatch(setAuth({isAuth: true}));
        if (getState().app.isInitilisingApp) {
          dispatch(initAppFinish());
        }
      })
      .catch((err) => dispatch(getUserDataFail({message: err.message})));
  };
};

const setUserDataAttempt = () => ({
  type: SET_USER_DATA.ATTEMPT,
});

const setUserDataSuccess = () => ({
  type: SET_USER_DATA.SUCCESS,
});

const setUserDataFail = ({message}) => ({
  type: SET_USER_DATA.FAIL,
  message,
});

export const setUserData = () => {
  return (dispatch, getState) => {
    dispatch(setUserDataAttempt());
    const lastestUserData = getState().user;
    if (!lastestUserData.id) {
      dispatch(setUserDataFail({message: 'No lastestUserData id'}));
    }
    database
      .ref(`${usersPath}/${lastestUserData.id}`)
      .set(lastestUserData)
      .then((snapshot) => {
        /* eslint-disable no-console */
        dispatch(setUserDataSuccess());
      })
      .catch((err) => dispatch(setUserDataFail({message: err.message})));
  };
};
