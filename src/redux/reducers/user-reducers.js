import {GET_USER_DATA, SET_USER_DATA} from '../actions/user-actions';
import {INIT_NEW_COLLECTION} from '../actions/collection-actions';
const defaultState = {
  name: '',
  id: '',
  email: '',
  collections: [],
  watched: [],
  loved: [],
  // downloadingData: false,
  // downloadingDataFailed: false,
  // downloadedData: false,
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_DATA.ATTEMPT:
      return defaultState;
    case GET_USER_DATA.SUCCESS:
      return Object.assign({}, state, action.userData);
    case INIT_NEW_COLLECTION.SUCCESS:
      return Object.assign({}, state, {
        collections:
          state.id === action.admin
            ? [...state.collections, action.id]
            : state.collection,
      });
    case SET_USER_DATA.SUCCESS:
    case SET_USER_DATA.FAIL:
    case SET_USER_DATA.ATTEMPT:
    case GET_USER_DATA.FAIL:
    default:
      return state;
  }
};

export default user;
