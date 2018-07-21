import {connect} from 'react-redux';
import SignUp from '../components/User/SignUp';
import {signUp} from '../redux/actions/user-actions';

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: ({email, password}) => {
    dispatch(signUp({email, password}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
