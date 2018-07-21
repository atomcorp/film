import React from 'react';
import PropsType from 'prop-types';
import PrivateRoute from './PrivateRoute';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import SignInContainer from '../containers/SignInContainer';
import SignUpContainer from '../containers/SignUpContainer';
import {FilmApp} from '../components/';

const Router = (props) => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/app" component={FilmApp} />
      <Route exact path="/signin" component={SignInContainer} />
      <Route path="/signup" component={SignUpContainer} />
      <Redirect to="/app" />
    </Switch>
  </BrowserRouter>
);

Router.propTypes = {
  children: PropsType.element,
};

export default Router;
