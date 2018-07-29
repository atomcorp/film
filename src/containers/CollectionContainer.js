import Collection from '../components/Collection/Collection';
import isCollectionEditable from '../components/Collection/isCollectionEditable';
import {connect} from 'react-redux';
import {
  initNewCollection,
  getCollectionData,
} from '../redux/actions/collection-actions';

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
    getCollectionData: ({id}) => {
      dispatch(getCollectionData({id}));
    },
  })
)(isCollectionEditable(Collection));
