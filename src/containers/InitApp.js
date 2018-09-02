import {connect} from 'react-redux';
import Init from '../components/Init/Init';

const mapStateToProps = ({app, user, auth}) => ({
  app,
  user,
  auth,
});

export default connect(mapStateToProps)(Init);
