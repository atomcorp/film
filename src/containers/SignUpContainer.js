import {connect} from 'react-redux';
import SignUp from '../components/User/SignUp';
import {signUpWithFirebaseAuth} from '../redux/actions/app-actions';

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => ({
  signUpWithFirebaseAuth: ({email, password, name}) => {
    dispatch(signUpWithFirebaseAuth({email, password, name}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
