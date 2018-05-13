import Collection from '../../components/Collection/Collection';
import {connect} from 'react-redux';
import {
  toggleWatchedList,
  removeFilmFromCollection,
} from '../../redux/actions/collection-actions';
import filterCollection from '../../helpers/filterCollection';

const mapStateToProps = (state) => ({
  films: filterCollection(state.collection),
  allFilms: state.collection.films,
  watched: state.collection.watched,
});

const mapDispatchToProps = (dispatch) => ({
  toggleWatchedList: (imdbID) => {
    dispatch(toggleWatchedList(imdbID));
  },
  removeFilmFromCollection: ({imdbID}) => {
    dispatch(removeFilmFromCollection({imdbID}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
