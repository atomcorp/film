import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SearchResult} from '../';

const SearchResults = ({searchResults, search}) => (
  <div className="search-results">
    {search.searchResults.map((result) => (
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

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

