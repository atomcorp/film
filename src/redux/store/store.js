import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import search from '../reducers/search-reducers';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  search,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
