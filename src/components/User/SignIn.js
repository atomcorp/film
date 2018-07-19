import React from 'react';
import {Redirect} from 'react-router-dom';
import fakeAuth from '../../router/fakeAuth';
/**
 * Fake login
 */
class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({redirectToReferrer: true});
    });
  };

  /**
   * @return {el}
   */
  render() {
    const {redirectToReferrer} = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/app" />;
    }

    return (
      <div>
        <p>You must log in to view the app</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

const FakeSignIn = Login;

const SignIn = () => (
  <div>
    Sign in
    <FakeSignIn />
  </div>
);

export default SignIn;
