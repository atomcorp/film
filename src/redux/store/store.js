import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import search from '../reducers/search-reducers';
import collection from '../reducers/collection-reducers';
import {
  postUsersDataToDatabase,
  getUsersDataAndUpdateSite,
} from '../actions/database-actions';

const rootReducer = combineReducers({
  search,
  collection,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
store.dispatch(getUsersDataAndUpdateSite());

let currentCollection = {};
const handleChange = () => {
  let previousCollection = currentCollection;
  currentCollection = store.getState().collection;
  if (currentCollection !== previousCollection) {
    postUsersDataToDatabase(currentCollection);
  }
};

store.subscribe(handleChange);

export default store;
