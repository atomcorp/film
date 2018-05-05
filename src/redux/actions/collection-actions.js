import {API_KEY} from '../../config/api';
const ADD_TO_COLLECTION = {
  ATTEMPT: 'ADD_TO_COLLECTION_ATTEMPT',
  SUCCESS: 'ADD_TO_COLLECTION_SUCCESS',
  FAIL: 'ADD_TO_COLLECTION_FAIL',
};
const ADD_TO_WATCHED_LIST = {
  ATTEMPT: 'ADD_TO_WATCHED_LIST_ATTEMPT',
  SUCCESS: 'ADD_TO_WATCHED_LIST_SUCCESS',
  FAIL: 'ADD_TO_WATCHED_LIST_FAIL',
}

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

// ADD TO WATCHED LIST

const addToWatchedListAttempt = () => ({
  type: ADD_TO_WATCHED_LIST.ATTEMPT,
});

const addToWatchedListSuccess = ({imdbID}) => ({
  type: ADD_TO_WATCHED_LIST.SUCCESS,
  imdbID,
});

const addToWatchedListFail = ({message}) => ({
  type: ADD_TO_WATCHED_LIST.FAIL,
  message,
});

const isFilmAlreadyInWatchList = ({imdbID, watched}) => {
  return watched.includes(imdbID);
}

const addFilmToWatchedList = ({imdbID}) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(addToWatchedListAttempt());
    if (isFilmAlreadyInWatchList({
      imdbID,
      watched: state.collection.watched,
    })) {
    dispatch(addToWatchedListFail({
      message: 'Already in list',
    }));
    return;
    }
    dispatch(addToWatchedListSuccess({imdbID}));
  }
}

export {
  ADD_TO_COLLECTION,
  addFilmImdbDataToCollection,
  ADD_TO_WATCHED_LIST,
  addFilmToWatchedList,
};
