import {
  REQUEST_DATA_FROM_DB,
  RECEIVED_DATA_FROM_DB,
} from '../actions/database-actions';

const database = (state = {
  isDownloading: false,
}, action) => {
  switch (action.type) {
    case REQUEST_DATA_FROM_DB:
      return Object.assign({}, state, {
        isDownloading: true,
      });
    case RECEIVED_DATA_FROM_DB:
      return Object.assign({}, state, {
        isDownloading: false,
      });
    default:
      return state;
  }
};

export default database;
