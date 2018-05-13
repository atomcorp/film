import Collection from '../../components/Collection/Collection';
import {connect} from 'react-redux';
import {
  toggleWatchedList,
  removeFilmFromCollection,
  toggleFilmRating,
} from '../../redux/actions/collection-actions';
import filterCollection from '../../helpers/filterCollection';

const mapStateToProps = (state) => ({
  filteredFilms: filterCollection(state.collection),
  watched: state.collection.watched,
  loved: state.collection.loved,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
