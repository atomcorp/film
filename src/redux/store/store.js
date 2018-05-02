import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// Reducers
import search from '../reducers/search-reducers';
import collection from '../reducers/collection-reducers';

const rootReducer = combineReducers({
  search,
  collection,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
