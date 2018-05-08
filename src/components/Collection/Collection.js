import React from 'react';
import PropTypes from 'prop-types';

/**
 * @typedef film
 * Full film data from omdbAPI
 * @property {string} Director
 * @property {string} imdbID
 * @property {string} Year
 * @property {string} Genre - comma separated
 * @property {string} Writer
 * @property {string} Actors - comma separated
 * @property {string} Plot
 * @property {string} Language - comma separated
 * @property {string} Country - comma separated
 * @property {string} Awards
 * @property {string} Poster
 * @property {object} Ratings
 * @property {string} Ratings.Source
 * @property {string} Ratings.Value
 * @property {string} Production
 * @property {string} Website
 */

/**
 * List the films in the collection
 * @param {object} collection
 * @param {Array<film>} collection.film
 * @return {HTML}
 */
const Collection = ({
  films,
  watched,
  toggleWatchedList,
}) => (
    <div>
      <h2>Collection:</h2>
      <ol>
        {films &&
          films.map((film) => (
            <li key={film.imdbID}>
              <h4>{film.Title} ({film.Year})</h4>
              {film.Director}
              <br />
              <i onClick={() => {
                toggleWatchedList({
                  imdbID: film.imdbID,
                });
              }}>{
                  watched.includes(film.imdbID)
                    ? 'Remove from watched list'
                    : 'Add to watched list'
                }</i>
            </li>
          ))}
      </ol>
    </div>
  );

Collection.propTypes = {
  toggleWatchedList: PropTypes.func,
  films: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      Director: PropTypes.string,
      imdbID: PropTypes.string,
      Year: PropTypes.string,
      Genre: PropTypes.string,
      Writer: PropTypes.string,
      Actors: PropTypes.string,
      Plot: PropTypes.string,
      Language: PropTypes.string,
      Country: PropTypes.string,
      Awards: PropTypes.string,
      Poster: PropTypes.string,
      Ratings: PropTypes.arrayOf(
        PropTypes.shape({
          Source: PropTypes.string,
          Value: PropTypes.string,
        })
      ),
      Production: PropTypes.string,
      Website: PropTypes.string,
    })
  ),
  watched: PropTypes.arrayOf(PropTypes.string),
};

export default Collection;
