import {Highlight} from '../../components';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  highlight: state.highlight,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Highlight);
