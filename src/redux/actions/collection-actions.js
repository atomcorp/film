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

const addFilmImdbDataToCollection = ({imdbID}) => {
  return (dispatch) => {
    dispatch(addToCollectionAttempt({imdbID}));
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
      .catch((err) => dispatch(addToCollectionFail(err)));
  };
};

export {addFilmImdbDataToCollection, ADD_TO_COLLECTION};
