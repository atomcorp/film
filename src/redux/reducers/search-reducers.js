import {
  SEARCH_ATTEMPT,
  SEARCH_FAIL,
  SEARCH_SUCCESS,
  TURN_PAGER,
} from '../actions/search-actions';

/**
 * The final shape of the Search state
 * @typedef {Object} SearchState
 * @property {string} filmName
 * @property {string} searchResults
 * @property {string} message - errors
 */

/**
 * The search reducer
 * @param {SearchState} state - the state for search
 * @param {Object} action
 * @param {string} action.type - Action type
 * @param {string} action.filmName - Search term
 * @param {string} action.searchResults - Array of objects from search
 * @param {string} action.message - Error message
 * @return {SearchState}
 */
const search = (state = {
  filmName: '',
  searchResults: [],
  message: '',
  currentPage: 1,
  totalResults: 0,
  totalPages: 1,
}, action) => {
  switch (action.type) {
    case SEARCH_ATTEMPT:
      return Object.assign({}, state, {filmName: action.filmName});
    case SEARCH_SUCCESS:
      return Object.assign({}, state, {
        searchResults: action.searchResults,
        totalResults: action.totalResults,
        message: '',
        totalPages: Math.ceil(action.totalResults / 10),
      });
    case SEARCH_FAIL:
      return Object.assign({}, state, {
        message: action.message,
        searchResults: [],
      });
    case TURN_PAGER:
      return Object.assign({}, state, {
        currentPage: action.page,
      });
    default:
      return state;
  }
};

export default search;
