import {
  HIGHLIGHT_REQUEST,
  HIGHLIGHT_SUCCESS,
  TOGGLE_HIGHLIGHT,
  HIGHLIGHT_REMOVE,
} from '../actions/highlight-actions';
import {GET_COLLECTION_DATA} from '../actions/collection-actions';

const defaultState = {
  imdbID: '',
  film: {},
  isFetching: false,
  visible: false,
};

const highlight = (state = defaultState, action) => {
  switch (action.type) {
    case HIGHLIGHT_REMOVE:
    case GET_COLLECTION_DATA.ATTEMPT:
      return defaultState;
    case HIGHLIGHT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        imdbID: action.imdbID,
      });
    case HIGHLIGHT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        film: action.film,
      });
    case TOGGLE_HIGHLIGHT:
      return Object.assign({}, state, {
        visible: true,
      });
    default:
      return state;
  }
};

export default highlight;
