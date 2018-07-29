import CollectionName from '../components/Collection/CollectionName';
import {connect} from 'react-redux';
import {setCollectionName} from '../redux/actions/collection-actions';

export default connect(
  (state) => ({
    collection: state.collection,
  }),
  (dispatch) => ({
    setCollectionName: ({name}) => {
      dispatch(setCollectionName({name}));
    },
  })
)(CollectionName);
