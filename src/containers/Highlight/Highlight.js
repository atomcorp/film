import {Highlight} from '../../components';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  visible: state.highlight.visible,
  film: state.highlight.film,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Highlight);

