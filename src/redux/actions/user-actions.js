import {database} from '../../firebase/firebase';
import {usersPath} from '../../config/paths';

export const GET_USER_DATA = {
  ATTEMPT: 'GET_USER_DATA_ATTEMPT',
  SUCCESS: 'GET_USER_DATA_SUCCESS',
  FAIL: 'GET_USER_DATA_FAIL',
};

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
        /* eslint-disable no-console */
        dispatch(getUserDataSuccess({userData: snapshot.val()}));
      })
      .catch((err) => dispatch(getUserDataFail({message: err.message})));
  };
};
