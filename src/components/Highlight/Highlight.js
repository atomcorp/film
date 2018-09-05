import React from 'react';
import PropTypes from 'prop-types';
import css from './Highlight.css';

const Film = ({film}) => (
  <div className={css.film}>
    <div className={css.poster}>
      <img src={film.Poster} />
    </div>
    <div className={css.details}>
      <h2>
        {film.Title} ({film.Year})
      </h2>
      <h4>dir: {film.Director}</h4>
      <p>{film.Plot}</p>
      <div>{film.Genre}</div>
      {film.Ratings &&
        film.Ratings.map((rating, index) => {
          return (
            <div key={index}>
              {rating.Source}: {rating.Value}
            </div>
          );
        })}
    </div>
  </div>
);

Film.propTypes = {
  film: PropTypes.object,
};

const Highlight = ({visible, film}) => (
  <div className={css.container}>
    {film && film.Response ? <Film film={film} /> : <div />}
  </div>
);

Highlight.propTypes = {
  film: PropTypes.object,
  visible: PropTypes.bool,
};

export default Highlight;
