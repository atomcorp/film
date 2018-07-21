import {connect} from 'react-redux';
import SignUp from '../components/User/SignUp';
import {signUp} from '../redux/actions/app-actions';

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: ({email, password, name}) => {
    dispatch(signUp({email, password, name}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
