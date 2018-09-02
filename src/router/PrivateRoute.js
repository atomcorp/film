import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) =>
      rest.auth.isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

const mapStateToProps = ({auth}) => ({
  auth,
});

export default connect(mapStateToProps)(PrivateRoute);
