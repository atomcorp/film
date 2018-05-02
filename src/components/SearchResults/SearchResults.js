import React from 'react';
import PropTypes from 'prop-types';

/**
 * An object returned from an OMDB api search
 * @typedef {Object} omdbSearchResult
 * @property {string} Title - Title of the film
 * @property {string} Year - Year of films release
 * @property {string} imdbID - IMDB ID
 * @property {string} Type - Whether movie or TV etc
 * @property {string} Poster - URL to jpg of movie poster
 */

/**
 * An individual search result
 * @param {Object} omdbSearchResult
 * @return {HTML}
 */
const SearchResult = ({Title}) => <div>{Title}</div>;

const SearchResults = ({searchResults}) => (
  <div className="search-results">
    {searchResults.map((result) => (
      <SearchResult key={result.imdbID} {...result} />
    ))}
  </div>
);

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
    })
  ),
};

SearchResult.propTypes = {
  Title: PropTypes.string,
};

export {SearchResults};
