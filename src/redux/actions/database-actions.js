import {database} from '../../firebase/firebase';

const REQUEST_DATA_FROM_DB = 'REQUEST_DATA_FROM_DB';
const RECEIVED_DATA_FROM_DB = 'RECEIVED_DATA_FROM_DB';
// const PUSH_TO_DB = {
//   ATTEMPT: 'PUSH_TO_DB_ATTEMPT',
//   SUCCESS: 'PUSH_TO_DB_SUCCESS',
//   FAIL: 'PUSH_TO_DB_FAIL',
// };
// const SEND_DATA_TO_DB = 'SEND_DATA_TO_DB';

const requestDataFromDatabase = () => ({
  type: REQUEST_DATA_FROM_DB,
});

const receivedDataFromDatabase = ({data = {}}) => ({
  type: RECEIVED_DATA_FROM_DB,
  data,
});

// const sentDataToDatabase = () => ({
//   type: SEND_DATA_TO_DB,
// });

const getUsersDataAndUpdateSite = () => {
  return (dispatch) => {
    dispatch(requestDataFromDatabase());
    database
      .ref('/collection')
      .once('value')
      .then((res) => res.val())
      .then((data) => {
        dispatch(receivedDataFromDatabase({data}));
      })
      .catch((err) => err);
  };
};

const postUsersDataToDatabase = (collection) => {
  database.ref('/collection').set(collection);
};

// const pushToDbAttempt = () => ({
//   type: PUSH_TO_DB.ATTEMPT,
// });

// const pushToDbSuccess = () => ({
//   type: PUSH_TO_DB.SUCCESS,
// });

// const pushToDbFail = () => ({
//   type: PUSH_TO_DB.FAIL,
// });

// export const pushToDb = ({id}) => {
//   return (dispatch, getState) => {
//     dispatch(pushToDbAttempt());
//     const imdbIds = getState().collection.imdbIDs;
//     database
//       .ref(`/collection/${id}/imdbIDs/`)
//       .set(imdbIds)
//       .then(() => {
//         dispatch(pushToDbSuccess());
//       })
//       .catch(dispatch(pushToDbFail()));
//   };
// };

export {
  getUsersDataAndUpdateSite,
  RECEIVED_DATA_FROM_DB,
  REQUEST_DATA_FROM_DB,
  postUsersDataToDatabase,
};
