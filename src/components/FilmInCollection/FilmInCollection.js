import React from 'react';
import PropTypes from 'prop-types';
import css from './FilmInCollection.css';

const FilmInCollection = ({
  showHighlight,
  film,
  collection,
  toggleWatchedState,
  remove,
  editable,
}) => (
  <div
    className={css.container}
    onClick={() => showHighlight({imdbID: film.imdbID})}
  >
    <div className={css.details}>
      <div className={css.title}>
        {film.Title} <span className={css.year}>({film.Year})</span>
      </div>
      <div className={css.director}>{film.Director}</div>
    </div>
    <div className={css.events}>
      <div
        className={css.status}
        onClick={(e) => {
          e.stopPropagation();
          toggleWatchedState({imdbID: film.imdbID});
        }}
      >
        {(collection.loved.includes(film.imdbID) && '💖') ||
          (collection.watched.includes(film.imdbID) && '✔️') ||
          '❌'}
      </div>
      {remove && <div className={css.buttons}>{remove}</div>}
    </div>
  </div>
);

FilmInCollection.propTypes = {
  showHighlight: PropTypes.func,
  film: PropTypes.object,
  collection: PropTypes.shape({
    watched: PropTypes.arrayOf(PropTypes.string),
    loved: PropTypes.arrayOf(PropTypes.string),
  }),
  toggleWatchedState: PropTypes.func,
  remove: PropTypes.element,
  editable: PropTypes.bool,
};

export default FilmInCollection;
