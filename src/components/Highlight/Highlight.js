import React from 'react';
import PropTypes from 'prop-types';

const Film = ({film}) => (
  <div>
    <h2>{film.Title} ({film.Year})</h2>
    <h4>dir: {film.Director}</h4>
    <img src={film.Poster} />
    <p>{film.Plot}</p>
    <div>{film.Genre}</div>
    {
      film.Ratings && film.Ratings.map((rating, index) => {
        return (
          <div key={index}>
            {rating.Source}: {rating.Value}
          </div>
        );
      })
    }
  </div>
);

Film.propTypes = {
  film: PropTypes.object,
};

const Highlight = ({
  visible,
  film,
}) => (
  <div style={{display: visible ? 'block' : 'none'}}>
    {
      film && film.Response ? <Film film={film} /> : <div></div>
    }
  </div>
);

Highlight.propTypes = {
  film: PropTypes.object,
  visible: PropTypes.bool,
};

export default Highlight;
