import {database} from '../../firebase/firebase';
const REQUEST_DATA_FROM_DB = 'REQUEST_DATA_FROM_DB';
const RECEIVED_DATA_FROM_DB = 'RECEIVED_DATA_FROM_DB';
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
    database.ref('/collection')
      .once('value')
      .then((res) => res.val())
      .then(((data) => {
        dispatch(receivedDataFromDatabase({data}));
      }))
      .catch((err) => err);
  };
};

const postUsersDataToDatabase = (collection) => {
  database.ref('/collection')
    .set(collection);
};

export {
  getUsersDataAndUpdateSite,
  RECEIVED_DATA_FROM_DB,
  REQUEST_DATA_FROM_DB,
  postUsersDataToDatabase,
};
