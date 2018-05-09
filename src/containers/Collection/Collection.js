import Collection from '../../components/Collection/Collection';
import {connect} from 'react-redux';
import {toggleWatchedList} from '../../redux/actions/collection-actions';
import {COLLECTION_VISIBILITY} from '../../redux/actions/collection-actions';

const filterCollection = ({films, visibility, watched}) => {
  switch (visibility) {
    case COLLECTION_VISIBILITY.UNWATCHED:
      return films.reduce((acc, film) => {
        if (!watched.includes(film.imdbID)) {
          return [...acc, film];
        }
        return acc;
      }, []);
    case COLLECTION_VISIBILITY.WATCHED:
      return films.reduce((acc, film) => {
        if (watched.includes(film.imdbID)) {
          return [...acc, film];
        }
        return acc;
      }, []);
    case COLLECTION_VISIBILITY.SHOW_ALL:
    default:
      return films;
  }
};

const mapStateToProps = (state) => ({
  films: filterCollection(state.collection),
  allFilms: state.collection.films,
  watched: state.collection.watched,
});

const mapDispatchToProps = (dispatch) => ({
  toggleWatchedList: (imdbID) => {
    dispatch(toggleWatchedList(imdbID));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);
