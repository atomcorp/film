import CollectionEditableList from '../components/Collection/CollectionEditableList';
import {connect} from 'react-redux';
import {
  toggleWatchedList,
  removeFilmFromCollection,
  toggleFilmRating,
  initNewCollection,
  toggleWatchedState,
} from '../redux/actions/collection-actions';
import {showHighlight} from '../redux/actions/highlight-actions';
import filterCollection from '../helpers/filterCollection';

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
  toggleWatchedList: (imdbID) => {
    dispatch(toggleWatchedList(imdbID));
  },
  removeFilmFromCollection: ({imdbID}) => {
    dispatch(removeFilmFromCollection({imdbID}));
  },
  toggleFilmRating: ({imdbID}) => {
    dispatch(toggleFilmRating({imdbID}));
  },
  showHighlight: ({imdbID}) => {
    dispatch(showHighlight({imdbID}));
  },
  // downloadData: () => {
  //   dispatch(showHighlight());
  // },
  initNewCollection: ({usersId, usersName}) => {
    dispatch(initNewCollection({usersId, usersName}));
  },
  toggleWatchedState: ({imdbID}) => {
    dispatch(toggleWatchedState({imdbID}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CollectionEditableList
);
