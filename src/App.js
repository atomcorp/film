import React from 'react';
import {hot} from 'react-hot-loader';
import {SearchContainer} from './containers';
import store from './redux/store/store';
import {Provider} from 'react-redux';

const App = () => (
  <Provider store={store}>
    <SearchContainer />
  </Provider>
);

export default hot(module)(App);


