import {Visibility} from '../../components';
import {connect} from 'react-redux';
import {
  setCollectionVisibility,
} from '../../redux/actions/collection-actions';

const mapStateToProps = (state) => ({
  visibility: state.collection.visibility,
});

const mapDispatchToProps = (dispatch) => ({
  setCollectionVisibility: ({visibility}) => {
    dispatch(setCollectionVisibility({visibility}));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Visibility);
