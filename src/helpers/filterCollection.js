import {COLLECTION_VISIBILITY} from '../redux/actions/collection-actions';

const filterCollection = ({films, visibility, watched}) => {
  switch (visibility) {
    case COLLECTION_VISIBILITY.UNWATCHED:
      return films.reduce((acc, filmData) => {
        if (!watched.includes(filmData.imdbID)) {
          return [...acc, filmData];
        }
        return acc;
      }, []);
    case COLLECTION_VISIBILITY.WATCHED:
      return films.reduce((acc, filmData) => {
        if (watched.includes(filmData.imdbID)) {
          return [...acc, filmData];
        }
        return acc;
      }, []);
    case COLLECTION_VISIBILITY.SHOW_ALL:
    default:
      return films;
  }
};

export default filterCollection;
