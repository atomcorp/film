import React from 'react';
import PropsType from 'prop-types';
import PrivateRoute from './PrivateRoute';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignInContainer from '../containers/SignInContainer';
import SignUpContainer from '../containers/SignUpContainer';
import CollectionContainer from '../containers/CollectionContainer';
import {FilmApp, Home} from '../components/';

const Router = (props) => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/app" component={CollectionContainer} />
      <Route exact path="/signin" component={SignInContainer} />
      <Route path="/signup" component={SignUpContainer} />
      <Route path="/c/:id" component={CollectionContainer} />
      {/* if user logged in show their last collection */}
      {/* <Route path="/c/" component={CollectionContainer} /> */}
      <Route component={Home} />
    </Switch>
  </BrowserRouter>
);

Router.propTypes = {
  children: PropsType.element,
};

export default Router;
