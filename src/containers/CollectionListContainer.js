import CollectionList from '../components/Collection/CollectionList';
import {connect} from 'react-redux';
import {
  toggleWatchedList,
  removeFilmFromCollection,
  toggleFilmRating,
  initNewCollection,
} from '../redux/actions/collection-actions';
import {showHighlight} from '../redux/actions/highlight-actions';
import filterCollection from '../helpers/filterCollection';

const mapStateToProps = (state) => ({
  isDownloading: state.database.isDownloading,
  collection: state.collection,
  filteredCollection: filterCollection(state.collection.filmIds),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
