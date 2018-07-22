import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import search from '../reducers/search-reducers';
import collection from '../reducers/collection-reducers';
import database from '../reducers/database-reducers';
import highlight from '../reducers/highlight-reducer';
import app from '../reducers/app-reducer';
import user from '../reducers/user-reducers';
// import {
//   postUsersDataToDatabase,
//   getUsersDataAndUpdateSite,
// } from '../actions/database-actions';
import {auth} from '../../firebase/firebase';
import {getUserData} from '../actions/user-actions';
import {signOut, signInSuccess} from '../actions/app-actions';

// import {initNewCollection} from '../actions/collection-actions';

const rootReducer = combineReducers({
  search,
  collection,
  database,
  highlight,
  app,
  user,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
// store.dispatch(
//   initNewCollection({
//     usersId: 'DQptYcFM5uhhVxLmmEctUqnjf0f2',
//     usersName: 'Thomas',
//   })
// );
// store.dispatch(getUsersDataAndUpdateSite());

// This is for updating our state
// about Firebase.Auth changes
auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(getUserData({id: user.uid}));
    store.dispatch(signInSuccess());
  } else {
    store.dispatch(signOut());
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
