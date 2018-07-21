import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import search from '../reducers/search-reducers';
import collection from '../reducers/collection-reducers';
import database from '../reducers/database-reducers';
import highlight from '../reducers/highlight-reducer';
import app from '../reducers/app-reducer';
import {
  postUsersDataToDatabase,
  getUsersDataAndUpdateSite,
} from '../actions/database-actions';

const rootReducer = combineReducers({
  search,
  collection,
  database,
  highlight,
  app,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
store.dispatch(getUsersDataAndUpdateSite());

let currentCollection = {};
const handleChange = () => {
  let previousCollection = currentCollection;
  const state = store.getState();
  currentCollection = state.collection;
  if (
    currentCollection !== previousCollection &&
    !state.database.isDownloading
  ) {
    postUsersDataToDatabase(currentCollection);
  }
};

store.subscribe(handleChange);

export default store;
