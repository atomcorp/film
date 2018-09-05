import React from 'react';
import PropTypes from 'prop-types';
import css from './Highlight.css';
import ProgressiveImage from 'react-progressive-image';

const Film = ({film}) => (
  <div className={css.highlight}>
    <div className={css.poster}>
      <ProgressiveImage
        src={film.Poster.replace('SX300.jpg', 'SX800.jpg')}
        placeholder={film.Poster.replace('SX300.jpg', 'SX10.jpg')}
      >
        {(src, loading) => (
          <img
            className={css.img}
            style={loading ? {width: '800px', maxWidth: '100%'} : {}}
            src={src}
            alt={film.Title}
          />
        )}
      </ProgressiveImage>
    </div>
    <div className={css.details}>
      <h2 className={css.title}>
        {film.Title} <span className={css.year}>({film.Year})</span>
      </h2>
      <h4 className={css.director}>{film.Director}</h4>
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
