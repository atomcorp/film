import {API_KEY} from '../../config/api';
const ADD_TO_COLLECTION = {
  ATTEMPT: 'ADD_TO_COLLECTION_ATTEMPT',
  SUCCESS: 'ADD_TO_COLLECTION_SUCCESS',
  FAIL: 'ADD_TO_COLLECTION_FAIL',
};
const TOGGLE_WATCHED_LIST = {
  ATTEMPT: 'TOGGLE_WATCHED_LIST_ATTEMPT',
  ADD: 'TOGGLE_WATCHED_LIST_ADD',
  REMOVE: 'TOGGLE_WATCHED_LIST_REMOVE',
};
const SET_COLLECTION_VISIBILITY = 'SET_COLLECTION_VISIBILITY';
const COLLECTION_VISIBILITY = {
  SHOW_ALL: 'SHOW_ALL',
  UNWATCHED: 'SHOW_UNWATCHED',
  WATCHED: 'SHOW_WATCHED',
};

const REORDER_COLLECTION = 'REORDER_COLLECTION';

// ADD TO COLLECTION

const addToCollectionAttempt = ({imdbID}) => ({
  type: ADD_TO_COLLECTION.ATTEMPT,
  imdbID,
});

const addToCollectionSuccess = ({filmResult}) => ({
  type: ADD_TO_COLLECTION.SUCCESS,
  filmResult,
});

const addToCollectionFail = ({message}) => ({
  type: ADD_TO_COLLECTION.FAIL,
  message,
});

const isFilmAlreadyInCollection = ({imdbID, films}) => {
  if (films.length < 1) {
    return false;
  }
  return films.some((film) => film.imdbID === imdbID);
};

const addFilmImdbDataToCollection = ({imdbID}) => {
  return (dispatch, getState) => {
    dispatch(addToCollectionAttempt({imdbID}));
    const state = getState();
    if (isFilmAlreadyInCollection({
      films: state.collection.films,
      imdbID,
    })) {
      dispatch(addToCollectionFail({
        message: 'Film has already been added',
      }));
      return;
    }
    fetch(
      `http://omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.Response === 'False') {
          throw new Error(res.Error);
        }
        dispatch(
          addToCollectionSuccess({
            filmResult: res,
          })
        );
      })
      .catch((err) => dispatch(addToCollectionFail({
        message: err,
      })));
  };
};

const isFilmInWatchList = ({imdbID, watched}) => {
  return watched.includes(imdbID);
};

const toggleWatchedListAttempt = () => ({
  type: TOGGLE_WATCHED_LIST.ATTEMPT,
});

const toggleWatchedListAdd = ({imdbID}) => ({
  type: TOGGLE_WATCHED_LIST.ADD,
  imdbID,
});

const toggleWatchedListRemove = ({imdbID}) => ({
  type: TOGGLE_WATCHED_LIST.REMOVE,
  imdbID,
});

/**
 * Either add or remove film from watchlist
 * @param {object} watchlistParams
 * @param {string} watchlistParams.imdbID
 * @return {void} void
 */
const toggleWatchedList = ({imdbID}) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(toggleWatchedListAttempt());
    if (!isFilmInWatchList({
      watched: state.collection.watched,
      imdbID,
    })) {
      // add to watched list
      dispatch(toggleWatchedListAdd({imdbID}));
    } else {
      // remove from watched list
      dispatch(toggleWatchedListRemove({imdbID}));
    }
  };
};

// CHANGE FILTER
const setCollectionVisibility = ({visibility}) => ({
  type: SET_COLLECTION_VISIBILITY,
  visibility,
});

// REORDER COLLECTION

const reorderCollection = ({from, to}) => ({
  type: REORDER_COLLECTION,
  from,
  to,
});

export {
  ADD_TO_COLLECTION,
  addFilmImdbDataToCollection,
  TOGGLE_WATCHED_LIST,
  toggleWatchedList,
  setCollectionVisibility,
  COLLECTION_VISIBILITY,
  SET_COLLECTION_VISIBILITY,
  reorderCollection,
  REORDER_COLLECTION,
};
