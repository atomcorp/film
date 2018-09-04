import React from 'react';
import PropTypes from 'prop-types';
import css from './FilmInCollection.css';

const FilmInCollection = ({showHighlight, film, collection}) => (
  <div
    className={css.container}
    onClick={() => showHighlight({imdbID: film.imdbID})}
  >
    <div className={css.title}>
      {film.Title} <span className={css.year}>({film.Year})</span>
    </div>
    <div className={css.director}>{film.Director}</div>
    {/* collection.watched.includes(film.imdbID) && ' ️👀' */}
    {/* collection.loved.includes(film.imdbID) && ' 💖' */}
  </div>
);

FilmInCollection.propTypes = {
  showHighlight: PropTypes.func,
  film: PropTypes.object,
  collection: PropTypes.shape({
    watched: PropTypes.arrayOf(PropTypes.string),
    loved: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default FilmInCollection;
