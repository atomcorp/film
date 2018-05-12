import React from 'react';
import {hot} from 'react-hot-loader';
import store from './redux/store/store';
import {Provider} from 'react-redux';
import {FilmApp} from './components';
const App = () => (
  <Provider store={store}>
    <FilmApp />
  </Provider>
);

export default hot(module)(App);


