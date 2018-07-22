import {GET_USER_DATA} from '../actions/user-actions';
const defaultState = {
  name: '',
  id: '',
  email: '',
  collections: [],
  watched: [],
  loved: [],
  downloadingData: false,
  downloadingDataFailed: false,
  downloadedData: false,
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_DATA.ATTEMPT:
      return Object.assign({}, defaultState, {
        downloadingData: true,
      });
    case GET_USER_DATA.SUCCESS:
      return Object.assign({}, state, action.userData, {
        downloadingData: false,
        downloadedData: true,
      });
    case GET_USER_DATA.FAIL:
      return Object.assign({}, state, {
        downloadingData: false,
        downloadingDataFailed: true,
      });
    default:
      return state;
  }
};

export default user;
