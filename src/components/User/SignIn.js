import React from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import fakeAuth from '../../router/fakeAuth';
/**
 *
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
    const {from} = this.props.location.state || {from: {pathname: '/'}};
    const {redirectToReferrer} = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

const RouteredSignIn = withRouter(Login);

const SignIn = () => (
  <div>
    Sign in
    <RouteredSignIn />
  </div>
);

export default SignIn;
