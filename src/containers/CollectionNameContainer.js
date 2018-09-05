import CollectionName from '@components/CollectionName/CollectionName';
import {connect} from 'react-redux';
import {setCollectionName} from '../redux/actions/collection-actions';

export default connect(
  (state) => ({
    collection: state.collection,
    editable: state.collection.admin === state.user.id,
  }),
  (dispatch) => ({
    setCollectionName: ({name}) => {
      dispatch(setCollectionName({name}));
    },
  })
)(CollectionName);
