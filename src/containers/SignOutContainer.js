import {connect} from 'react-redux';
import SignOut from '../components/User/SignOut';
import {signOut} from '../redux/actions/app-actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => {
    dispatch(signOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
