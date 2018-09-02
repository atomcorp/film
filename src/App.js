import React from 'react';
import {hot} from 'react-hot-loader';
import store from './redux/store/store';
import {Provider} from 'react-redux';
import Router from './router/Router';
import InitializeContainer from './containers/InitializeContainer';

const App = () => (
  <Provider store={store}>
    <div>
      <InitializeContainer>
        <Router />
      </InitializeContainer>
    </div>
  </Provider>
);

export default hot(module)(App);
