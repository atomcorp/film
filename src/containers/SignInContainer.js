import {connect} from 'react-redux';
import SignIn from '../components/User/SignIn';
import {signIn} from '../redux/actions/app-actions';

const mapStateToProps = ({app, user}) => ({
  app,
  user,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: ({email, password}) => {
    dispatch(signIn({email, password}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
