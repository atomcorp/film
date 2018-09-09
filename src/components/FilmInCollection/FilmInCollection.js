import React from 'react';
import PropTypes from 'prop-types';
import css from './FilmInCollection.css';

const FilmInCollection = ({
  showHighlight,
  film,
  collection,
  toggleWatchedState,
  removeFilmFromCollection,
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
    {editable && (
      <div className={css.actions}>
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
        <div
          onClick={() =>
            removeFilmFromCollection({
              imdbID: film.imdbID,
            })
          }
        >
          🗑️
        </div>
      </div>
    )}
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
  removeFilmFromCollection: PropTypes.func,
  editable: PropTypes.bool,
};

export default FilmInCollection;
