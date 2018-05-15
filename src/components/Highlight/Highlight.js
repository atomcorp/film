import React from 'react';

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

const Highlight = ({
  visible,
  film,
}) => (
  <div style={{display: visible ? 'block' : 'none'}}>
    {
      film.Response ? <Film film={film} /> : <div>Nope</div>
    }
  </div>
);

export default Highlight;
