import React from 'react';
import {Redirect} from 'react-router-dom';
import fakeAuth from '../../router/fakeAuth';

/**
 * Fake log out
 */
class LogOut extends React.Component {
  state = {
    redirectToReferrer: false,
  };

  logout = () => {
    fakeAuth.signout(() => {
      this.setState({redirectToReferrer: true});
    });
  };

  /**
   * @return {el}
   */
  render() {
    const {redirectToReferrer} = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <button onClick={this.logout}>Log out</button>
      </div>
    );
  }
}

const SignOut = () => (
  <div>
    Sign Out<br />
    <LogOut />
  </div>
);

export default SignOut;
