import {connect} from 'react-redux';
import SignIn from '../components/User/SignIn';
import {signInToFirebase} from '../redux/actions/app-actions';

const mapStateToProps = ({app, user, auth}) => ({
  app,
  user,
  auth,
});

const mapDispatchToProps = (dispatch) => ({
  signInToFirebase: ({email, password}) => {
    dispatch(signInToFirebase({email, password}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
