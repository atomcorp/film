import {API_KEY} from '../../config/api';
const ADD_TO_COLLECTION = {
  ATTEMPT: 'ADD_TO_COLLECTION_ATTEMPT',
  SUCCESS: 'ADD_TO_COLLECTION_SUCCESS',
  FAIL: 'ADD_TO_COLLECTION_FAIL',
};

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

export {addFilmImdbDataToCollection, ADD_TO_COLLECTION};
