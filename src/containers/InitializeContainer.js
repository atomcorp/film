import {connect} from 'react-redux';
import Initialize from '../components/Initialize/Initialize';
import {initAppDone} from '../redux/actions/app-actions';

export default connect(
  ({app, user, auth}) => ({
    app,
    user,
    auth,
  }),
  (dispatch) => ({
    initAppDone: () => dispatch(initAppDone()),
  })
)(Initialize);
