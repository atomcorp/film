import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import {
//   postUsersDataToDatabase,
//   getUsersDataAndUpdateSite,
// } from '../actions/database-actions';
import {auth} from '../../firebase/firebase';
import {
  addToLocalStorage,
  getFromLocalStorage,
} from '../../helpers/localstorage';
import {
  signInToFirebaseSuccess,
  signOut,
  signInToFirebaseAttempt,
  initAppFinish,
  initAppStart,
} from '../actions/app-actions';
import {getUserData} from '../actions/user-actions';
import app from '../reducers/app-reducer';
import {default as authReducer} from '../reducers/auth-reducer';
import collection from '../reducers/collection-reducers';
import database from '../reducers/database-reducers';
import highlight from '../reducers/highlight-reducer';
import search from '../reducers/search-reducers';
import user from '../reducers/user-reducers';

// import {initNewCollection} from '../actions/collection-actions';

const rootReducer = combineReducers({
  search,
  collection,
  database,
  highlight,
  app,
  user,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
store.dispatch(initAppStart());
// if user id is in localStorage try and download it
// otherwise just show app
if (getFromLocalStorage('id')) {
  store.dispatch(signInToFirebaseAttempt());
} else {
  store.dispatch(initAppFinish());
}

// This is for updating our state
// about Firebase.Auth changes
auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(signInToFirebaseSuccess());
    store.dispatch(getUserData({id: user.uid}));
    addToLocalStorage('id', user.uid);
  } else {
    if (store.getState().user.id) {
      store.dispatch(signOut());
    }
  }
});

// let currentCollection = {};
// const handleChange = () => {
//   let previousCollection = currentCollection;
//   const state = store.getState();
//   currentCollection = state.collection;
//   if (
//     currentCollection !== previousCollection &&
//     !state.database.isDownloading
//   ) {
//     postUsersDataToDatabase(currentCollection);
//   }
// };

// store.subscribe(handleChange);

export default store;
