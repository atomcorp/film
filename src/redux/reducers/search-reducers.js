import {
  SEARCH_ATTEMPT,
  SEARCH_FAIL,
  SEARCH_SUCCESS,
  TURN_PAGER,
  NEW_SEARCH,
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
const search = (
  state = {
    filmName: '',
    searchResults: [],
    message: '',
    currentPage: 1,
    totalResults: 0,
    totalPages: 1,
    isSearching: false,
    year: null,
  },
  action
) => {
  switch (action.type) {
    case SEARCH_ATTEMPT:
      return Object.assign({}, state, {
        filmName: action.filmName,
        year: action.year,
        isSearching: true,
      });
    case SEARCH_SUCCESS:
      return Object.assign({}, state, {
        searchResults: action.searchResults,
        totalResults: action.totalResults,
        message: '',
        totalPages: Math.ceil(action.totalResults / 10),
        isSearching: false,
      });
    case SEARCH_FAIL:
      return Object.assign({}, state, {
        message: action.message,
        searchResults: [],
        isSearching: false,
      });
    case TURN_PAGER:
      return Object.assign({}, state, {
        currentPage: action.page,
      });
    case NEW_SEARCH:
      return Object.assign({}, state, {
        currentPage: 1,
        totalPages: 1,
        totalResults: 0,
      });
    default:
      return state;
  }
};

export default search;
