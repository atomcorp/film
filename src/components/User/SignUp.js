import React from 'react';
import PropTypes from 'prop-types';
import {appStateType} from '../../types';

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
      name: '',
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
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
          {this.props.app.signUpFail &&
            this.props.app.signUpMessage.map((message) => message)}
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>Username</div>
              <input
                type="text"
                value={this.state.name}
                id="name"
                onChange={this.handleInputs}
              />
            </label>
            <label>
              <div>Email</div>
              <input
                type="email"
                value={this.state.email}
                id="email"
                onChange={this.handleInputs}
              />
            </label>
            <label>
              <div>Password</div>
              <input
                type="password"
                value={this.state.password}
                id="password"
                onChange={this.handleInputs}
              />
            </label>
            <div>
              <input type="submit" value="Sign up" />
            </div>
            {this.props.app.isSigningUp && 'Signing up'}
          </form>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  app: appStateType,
  signUp: PropTypes.func,
};

export default SignUp;
