import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {authType} from '@src/types';

const Home = ({auth}) => (
  <div>
    <h1>Home page</h1>
    {auth.isAuth ? (
      <Link to="/app">Your collection</Link>
    ) : (
      <div>
        <Link to="/signin">Sign in</Link>
        <br />
        <Link to="/signup">Sign up</Link>
      </div>
    )}

    <br />
    <Link to="/c/-LIX6jO8zd0_6EV_ipdq">Example collection</Link>
  </div>
);

Home.propTypes = {
  auth: authType,
};

export default connect(({auth}) => ({
  auth: auth,
}))(Home);
