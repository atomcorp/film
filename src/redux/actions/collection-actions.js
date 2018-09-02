import {API_KEY} from '../../config/api';
import {collectionsPath} from '../../config/paths';
import {setUserData} from './user-actions';
import {database} from '../../firebase/firebase';
import tryAction from '../../helpers/tryAction';
export const ADD_TO_COLLECTION = tryAction('ADD_TO_COLLECTION');
export const REMOVE_FROM_COLLECTION = 'REMOVE_FROM_COLLECTION';
export const TOGGLE_WATCHED_LIST = {
  ATTEMPT: 'TOGGLE_WATCHED_LIST_ATTEMPT',
  ADD: 'TOGGLE_WATCHED_LIST_ADD',
  REMOVE: 'TOGGLE_WATCHED_LIST_REMOVE',
};
export const SET_COLLECTION_VISIBILITY = 'SET_COLLECTION_VISIBILITY';
export const COLLECTION_VISIBILITY = {
  SHOW_ALL: 'SHOW_ALL',
  UNWATCHED: 'SHOW_UNWATCHED',
  WATCHED: 'SHOW_WATCHED',
};
export const REORDER_COLLECTION = 'REORDER_COLLECTION';
export const TOGGLE_RATING = {
  ATTEMPT: 'TOGGLE_RATING_ATTEMPT',
  ADD: 'TOGGLE_RATING_ADD',
  REMOVE: 'TOGGLE_RATING_REMOVE',
};

export const INIT_NEW_COLLECTION = tryAction('INIT_NEW_COLLECTION');
export const GET_COLLECTION_DATA = tryAction('GET_COLLECTION_DATA');
export const SET_COLLECTION_DATA = tryAction('SET_COLLECTION_DATA');

export const SET_COLLECTION_NAME = 'SET_COLLECTION_NAME';
// INIT_NEW_COLLECTION
const initNewCollectionAttempt = () => ({
  type: INIT_NEW_COLLECTION.ATTEMPT,
});

const initNewCollectionSuccess = ({admin, name, id}) => ({
  type: INIT_NEW_COLLECTION.SUCCESS,
  admin,
  name,
  id,
});

const initNewCollectionFail = ({message}) => ({
  type: INIT_NEW_COLLECTION.FAIL,
  message,
});

export const initNewCollection = ({usersId, usersName}) => (
  dispatch,
  getState
) => {
  dispatch(initNewCollectionAttempt());
  const newCollectionRef = database.ref(`${collectionsPath}`).push();
  newCollectionRef
    .set({
      admin: usersId,
      name: `${usersName}'s Collection`,
      id: newCollectionRef.key,
    })
    .then((id) => {
      dispatch(
        initNewCollectionSuccess({
          admin: usersId,
          name: `${usersName}'s Collection`,
          id: newCollectionRef.key,
        })
      );
    })
    .then(() => {
      dispatch(setUserData());
    })
    .catch((err) =>
      dispatch(
        initNewCollectionFail({
          message: err,
        })
      )
    );
};

/* const ref = database.ref(`${collectionsPath}`).push();
const initNewCollectionWithUniqueRef = (uniqueRef) => ({usersId, usersName}) =>
  initNewCollection({uniqueRef, usersId, usersName});

initNewCollectionWithUniqueRef(ref)({usersId: 'Id', usersName: 'Tom'});
 */
// ADD TO COLLECTION

const addToCollectionAttempt = ({imdbID}) => ({
  type: ADD_TO_COLLECTION.ATTEMPT,
  imdbID,
});

const addToCollectionSuccess = ({filmData}) => ({
  type: ADD_TO_COLLECTION.SUCCESS,
  filmData,
});

const addToCollectionFail = ({message}) => ({
  type: ADD_TO_COLLECTION.FAIL,
  message,
});

export const addFilmImdbDataToCollection = ({imdbID}) => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.collection.addingFilm) {
      dispatch(
        addToCollectionFail({
          message: 'Can only add one film at a time',
        })
      );
      return;
    }
    dispatch(addToCollectionAttempt({imdbID}));
    if (state.collection.films.find((filmData) => filmData.imdbID === imdbID)) {
      dispatch(
        addToCollectionFail({
          message: 'Film has already been added',
        })
      );
      return;
    }
    // if just adding imdbID
    // dispatch(
    //   addToCollectionSuccess({
    //     imdbID,
    //   })
    // );
    // dispatch(setCollectionData({id: state.collection.id}));

    // this does need to run off and fetch the movie info still
    // maybe use Indexed DB
    fetch(
      `//omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(
        imdbID
      )}&plot=full`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.Response === 'False') {
          throw new Error(res.Error);
        }
        dispatch(
          addToCollectionSuccess({
            filmData: res,
          })
        );
      })
      .then(() => {
        dispatch(setCollectionData({id: state.collection.id}));
      })
      .catch((err) =>
        dispatch(
          addToCollectionFail({
            message: err,
          })
        )
      );
  };
};

export const removeFilmFromCollection = ({imdbID}) => ({
  type: REMOVE_FROM_COLLECTION,
  imdbID,
});

// WATCHLIST

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
export const toggleWatchedList = ({imdbID}) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(toggleWatchedListAttempt());
    if (
      !isFilmInWatchList({
        watched: state.collection.watched,
        imdbID,
      })
    ) {
      // add to watched list
      dispatch(toggleWatchedListAdd({imdbID}));
    } else {
      // remove from watched list
      dispatch(toggleWatchedListRemove({imdbID}));
    }
  };
};

// CHANGE FILTER
export const setCollectionVisibility = ({visibility}) => ({
  type: SET_COLLECTION_VISIBILITY,
  visibility,
});

// REORDER COLLECTION

export const reorderCollection = ({from, to}) => ({
  type: REORDER_COLLECTION,
  from,
  to,
});

const toggleRatingAttempt = () => ({
  type: TOGGLE_RATING.ATTEMPT,
});

const toggleRatingAdd = ({imdbID}) => ({
  type: TOGGLE_RATING.ADD,
  imdbID,
});

const toggleRatingRemove = ({imdbID}) => ({
  type: TOGGLE_RATING.REMOVE,
  imdbID,
});

export const toggleFilmRating = ({imdbID}) => {
  return (dispatch, getState) => {
    dispatch(toggleRatingAttempt());
    const state = getState();
    if (!state.collection.loved.includes(imdbID)) {
      dispatch(toggleRatingAdd({imdbID}));
    } else {
      dispatch(toggleRatingRemove({imdbID}));
    }
  };
};

const getCollectionDataAttempt = () => ({
  type: GET_COLLECTION_DATA.ATTEMPT,
});

const getCollectionDataSuccess = ({collectionData}) => ({
  type: GET_COLLECTION_DATA.SUCCESS,
  collectionData,
});

const getCollectionDataFail = ({message}) => ({
  type: GET_COLLECTION_DATA.FAIL,
  message,
});

export const getCollectionData = ({id}) => {
  return (dispatch, getState) => {
    dispatch(getCollectionDataAttempt());
    database
      .ref(`${collectionsPath}/${id}`)
      .once('value')
      .then((snapshot) => {
        /* eslint-disable no-console */
        dispatch(getCollectionDataSuccess({collectionData: snapshot.val()}));
      })
      .catch((err) => dispatch(getCollectionDataFail({message: err.message})));
  };
};

const setCollectionDataAttempt = () => ({
  type: SET_COLLECTION_DATA.ATTEMPT,
});

const setCollectionDataSuccess = () => ({
  type: SET_COLLECTION_DATA.SUCCESS,
});

const setCollectionDataFail = ({message}) => ({
  type: SET_COLLECTION_DATA.FAIL,
  message,
});

export const setCollectionData = ({id}) => {
  return (dispatch, getState) => {
    dispatch(setCollectionDataAttempt());
    const latestCollectionData = getState().collection;
    database
      .ref(`${collectionsPath}/${id}`)
      .set(latestCollectionData)
      .then(() => {
        dispatch(setCollectionDataSuccess());
      })
      .catch((err) => dispatch(setCollectionDataFail({message: err.message})));
  };
};

export const setCollectionName = ({name}) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_COLLECTION_NAME,
      name,
    });
    dispatch(setCollectionData({id: getState().collection.id}));
  };
};

// export {
//   ADD_TO_COLLECTION,
//   addFilmImdbDataToCollection,
//   TOGGLE_WATCHED_LIST,
//   toggleWatchedList,
//   setCollectionVisibility,
//   COLLECTION_VISIBILITY,
//   SET_COLLECTION_VISIBILITY,
//   reorderCollection,
//   REORDER_COLLECTION,
//   removeFilmFromCollection,
//   REMOVE_FROM_COLLECTION,
//   toggleFilmRating,
//   TOGGLE_RATING,
// };
