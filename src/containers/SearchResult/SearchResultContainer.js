import {connect} from 'react-redux';
import {SearchResult} from '../../components';
import {
  addFilmImdbDataToCollection,
} from '../../redux/actions/collection-actions';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addFilmImdbDataToCollection: ({imdbID}) => {
    dispatch(addFilmImdbDataToCollection({imdbID}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
