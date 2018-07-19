import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect, withRouter} from 'react-router-dom';
import fakeAuth from './fakeAuth';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: {from: props.location},
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default withRouter(PrivateRoute);
