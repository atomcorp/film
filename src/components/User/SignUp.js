import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

/**
  @typedef Props
  @type {object}
*/

/**
 * SignUp
 */
class SignUp extends React.Component {
  /**
   * Search constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  /**
   * Handle input
   * @param {Event} event
   */
  handleInputs = ({target}) => {
    this.setState({
      [target.id]: target.value,
    });
  };
  /**
   * Handle input
   * @param {Event} event
   */
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signUp({
      email: this.state.email,
      password: this.state.email,
    });
  };
  /**
   * Render
   * @return {HTML} Link
   */
  render() {
    return (
      <div>
        <Link to="/signin">Sign in</Link>
        <div>
          <h2>Sign up</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              value={this.state.email}
              id="email"
              onChange={this.handleInputs}
            />
            <input
              type="password"
              value={this.state.password}
              id="password"
              onChange={this.handleInputs}
            />
            <input type="submit" value="Sign up" />
          </form>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  app: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    addingFilm: PropTypes.bool,
    visibility: PropTypes.string,
    isSigningIn: PropTypes.bool,
    signInFail: PropTypes.bool,
  }),
  signUp: PropTypes.func,
};

export default SignUp;
