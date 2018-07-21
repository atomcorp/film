import React from 'react';
import PropTypes from 'prop-types';
import {appStateType} from '../../types';
import {Link, Redirect} from 'react-router-dom';

/**
 * SignIn
 */
class SignIn extends React.Component {
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
    this.props.signIn({
      email: this.state.email,
      password: this.state.password,
    });
  };
  /**
   * Render
   * @return {HTML} Link
   */
  render() {
    if (this.props.app.isAuthenticated) {
      return <Redirect to="/app" />;
    }

    return (
      <div>
        <Link to="/signup">Sign up</Link>
        <h2>Sign in</h2>
        {this.props.app.signInFail &&
          this.props.app.signInMessage.map((message) => message)}
        <form onSubmit={this.handleSubmit}>
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
            <input type="submit" value="Sign in" />
          </div>
          {this.props.app.isSigningIn && 'Signing in'}
        </form>
        {this.props.app.isAuthenticated && <Link to="/app">App</Link>}
      </div>
    );
  }
}

SignIn.propTypes = {
  app: appStateType,
  signIn: PropTypes.func,
};

export default SignIn;
