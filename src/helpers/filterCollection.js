import {COLLECTION_VISIBILITY} from '../redux/actions/collection-actions';

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

export default filterCollection;