import Collection from '../../components/Collection/Collection';
import {connect} from 'react-redux';
import {
  toggleWatchedList,
  removeFilmFromCollection,
  toggleFilmRating,
} from '../../redux/actions/collection-actions';
import {addHighlight} from '../../redux/actions/highlight-actions';
import filterCollection from '../../helpers/filterCollection';

const mapStateToProps = (state) => ({
  filteredFilms: filterCollection(state.collection),
  watched: state.collection.watched,
  loved: state.collection.loved,
  isDownloading: state.database.isDownloading,
});

const mapDispatchToProps = (dispatch) => ({
  toggleWatchedList: (imdbID) => {
    dispatch(toggleWatchedList(imdbID));
  },
  removeFilmFromCollection: ({imdbID}) => {
    dispatch(removeFilmFromCollection({imdbID}));
  },
  toggleFilmRating: ({imdbID}) => {
    dispatch(toggleFilmRating({imdbID}));
  },
  addHighlight: ({imdbID}) => {
    dispatch(addHighlight({imdbID}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
