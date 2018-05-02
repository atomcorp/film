import React from 'react';
import PropTypes from 'prop-types';
import {SearchResultContainer} from '../../containers';

const SearchResults = ({searchResults}) => (
  <div className="search-results">
    {searchResults.map((result) => (
      <SearchResultContainer key={result.imdbID} {...result} />
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

export {SearchResults};
