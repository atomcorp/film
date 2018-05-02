import {ADD_TO_COLLECTION} from '../actions/collection-actions';
/**
 * This will hold all the films that have been added
 *
 * There will be other state arrays that hold IDs indicating
 * whether a a film has been watched or not etc
 */

const collection = (
  state = {
    films: [],
    message: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_COLLECTION.SUCCESS:
      return Object.assign({}, state, {
        films: [...state.films, action.filmResult],
      });
    case ADD_TO_COLLECTION.FAIL:
    case ADD_TO_COLLECTION.ATTEMPT:
    default:
      return state;
  }
};

export default collection;
