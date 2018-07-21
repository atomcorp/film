import React from 'react';
import PropsType from 'prop-types';
import PrivateRoute from './PrivateRoute';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import SignIn from '../components/User/SignIn';
import SignUpContainer from '../containers/SignUpContainer';
import SignOut from '../components/User/SignOut';
import {FilmApp} from '../components/';

const Router = (props) => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/app" component={FilmApp} />
      <PrivateRoute exact path="/signout" component={SignOut} />
      <Route exact path="/signin" component={SignIn} />
      <Route path="/" component={SignUpContainer} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

Router.propTypes = {
  children: PropsType.element,
};

export default Router;
