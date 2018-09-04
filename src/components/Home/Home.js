import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {authType} from '@src/types';
import SignOut from '@containers/SignOutContainer';

const Home = ({auth}) => (
  <div>
    <h1>Home page</h1>
    <Link to="/c/-LIX6jO8zd0_6EV_ipdq">Example collection</Link>
    <br />
    {auth.isAuth ? (
      <div>
        <Link to="/app">Your collection</Link>
        <br />
        <SignOut />
      </div>
    ) : (
      <div>
        <Link to="/signin">Sign in</Link>
        <br />
        <Link to="/signup">Sign up</Link>
      </div>
    )}

    <br />
  </div>
);

Home.propTypes = {
  auth: authType,
};

export default connect(({auth}) => ({
  auth: auth,
}))(Home);
