import {connect} from 'react-redux';
import CollectionStaticList from '../components/Collection/CollectionStaticList';
import filterCollection from '../helpers/filterCollection';
import {showHighlight} from '../redux/actions/highlight-actions';

const mapStateToProps = (state) => ({
  isDownloading: state.database.isDownloading,
  collection: state.collection,
  filteredFilms: filterCollection({
    films: state.collection.films,
    visibility: state.collection.visibility,
    watched: state.collection.watched,
  }),
});

const mapDispatchToProps = (dispatch) => ({
  showHighlight: ({imdbID}) => {
    dispatch(showHighlight({imdbID}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CollectionStaticList
);
