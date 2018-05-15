import {
  HIGHLIGHT_REQUEST,
  HIGHLIGHT_SUCCESS,
} from '../actions/highlight-actions';

const highlight = (state = {
  imdbID: '',
  film: {},
  isFetching: false,
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
    default:
      return state;
  }
};

export default highlight;
