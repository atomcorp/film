import React from 'react';
import {hot} from 'react-hot-loader';
import store from './redux/store/store';
import {Provider} from 'react-redux';
import Router from './router/Router';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default hot(module)(App);
