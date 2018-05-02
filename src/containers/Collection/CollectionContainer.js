import {connect} from 'react-redux';
import {Collection} from '../../components/Collection/Collection';

const mapStateToProps = (state) => ({
  collection: state.collection,
});

export default connect(mapStateToProps)(Collection);
