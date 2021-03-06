import React from 'react';
import PropTypes from 'prop-types';

const SignOut = (props) => (
  <div>
    <button onClick={props.signOut}>Sign out</button>
  </div>
);

SignOut.propTypes = {
  signOut: PropTypes.func,
};

export default SignOut;
