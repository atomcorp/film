import {
  ADD_TO_COLLECTION,
  TOGGLE_WATCHED_LIST,
  COLLECTION_VISIBILITY,
  SET_COLLECTION_VISIBILITY,
  REORDER_COLLECTION,
} from '../actions/collection-actions';
import reorderArray from '../../helpers/reorder';
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
    visibility: COLLECTION_VISIBILITY.SHOW_ALL,
    addingFilm: false,
  },
  action
) => {
  switch (action.type) {
    case SET_COLLECTION_VISIBILITY:
      return Object.assign({}, state, {visibility: action.visibility});
    case ADD_TO_COLLECTION.SUCCESS:
      return Object.assign({}, state, {
        films: [...state.films, action.filmResult],
        message: [],
        addingFilm: false,
      });
    case ADD_TO_COLLECTION.FAIL:
      return Object.assign({}, state, {
        message: [...state.message, action.message],
        addingFilm: false,
      });
    case TOGGLE_WATCHED_LIST.ADD:
      return Object.assign({}, state, {
        watched: [...state.watched, action.imdbID],
      });
    case TOGGLE_WATCHED_LIST.REMOVE:
      return Object.assign({}, state, {
        watched: state.watched.reduce(
          (acc, filmIds) => {
            if (filmIds !== action.imdbID) {
              return [...acc, filmIds];
            }
            return acc;
          }
        , []),
      });
    case REORDER_COLLECTION:
      return Object.assign({}, state, {
        films: reorderArray(state.films, action.from, action.to),
      });
    case TOGGLE_WATCHED_LIST.ATTEMPT:
    case ADD_TO_COLLECTION.ATTEMPT:
        return Object.assign({}, state, {
          addingFilm: true,
        });
    default:
      return state;
  }
};

export default collection;
