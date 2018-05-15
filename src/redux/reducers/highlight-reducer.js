import {
  HIGHLIGHT_REQUEST,
  HIGHLIGHT_SUCCESS,
  TOGGLE_HIGHLIGHT,
} from '../actions/highlight-actions';

const highlight = (state = {
  imdbID: '',
  film: {},
  isFetching: false,
  visible: false,
}, action) => {
  switch (action.type) {
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
