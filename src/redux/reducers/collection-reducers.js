import {
  ADD_TO_COLLECTION,
  ADD_TO_WATCHED_LIST,
} from '../actions/collection-actions';
/**
 * This will hold all the films that have been added
 *
 * There will be other state arrays that hold IDs indicating
 * whether a a film has been watched or not etc
 */

/**
 * Collection state shape
 * @typedef {object} CollectionState
 * @property {Array<object>} films - holds complete film data
 * @property {array<string>} message
 * @property {array<imdbID>} watched
 */

/**
 * Collection reducer
 * @param {CollectionState} state
 * @param {object} action
 * @param {object} action.filmResult
 * @param {string} action.message
 * @param {string} action.imdbID
 * @return {CollectionState}
 */
const collection = (
  state = {
    films: [],
    message: [],
    watched: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_COLLECTION.SUCCESS:
      return Object.assign({}, state, {
        films: [...state.films, action.filmResult],
        message: [],
      });
    case ADD_TO_WATCHED_LIST.FAIL:
    case ADD_TO_COLLECTION.FAIL:
      return Object.assign({}, state, {
        message: [...state.message, action.message],
      });
    case ADD_TO_WATCHED_LIST.SUCCESS:
      return Object.assign({}, state, {
        watched: [...state.watched, action.imdbID],
      });
    case ADD_TO_WATCHED_LIST.ATTEMPT:
    case ADD_TO_COLLECTION.ATTEMPT:
    default:
      return state;
  }
};

export default collection;
