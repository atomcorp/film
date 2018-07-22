import Collection from '../components/Collection/Collection';
import {connect} from 'react-redux';
import {initNewCollection} from '../redux/actions/collection-actions';

export default connect(
  (state) => ({
    user: state.user,
    collection: state.collection,
  }),
  (dispatch) => ({
    initNewCollection: ({usersId, usersName}) => {
      dispatch(
        initNewCollection({
          usersId,
          usersName,
        })
      );
    },
  })
)(Collection);
