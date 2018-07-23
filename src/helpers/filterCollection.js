import {COLLECTION_VISIBILITY} from '../redux/actions/collection-actions';

const filterCollection = ({imdbIDs, visibility, watched}) => {
  switch (visibility) {
    case COLLECTION_VISIBILITY.UNWATCHED:
      return imdbIDs.reduce((acc, imdbID) => {
        if (!watched.includes(imdbID)) {
          return [...acc, imdbID];
        }
        return acc;
      }, []);
    case COLLECTION_VISIBILITY.WATCHED:
      return imdbIDs.reduce((acc, imdbID) => {
        if (watched.includes(imdbID)) {
          return [...acc, imdbID];
        }
        return acc;
      }, []);
    case COLLECTION_VISIBILITY.SHOW_ALL:
    default:
      return imdbIDs;
  }
};

export default filterCollection;
