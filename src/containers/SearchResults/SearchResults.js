import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SearchResult} from '../';
import {
  addFilmImdbDataToCollection,
} from '../../redux/actions/collection-actions';

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

const mapStateToProps = (state) => ({
  search: state.state,
});

const mapDispatchToProps = (dispatch) => ({
  addFilmImdbDataToCollection: ({imdbID}) => {
    dispatch(addFilmImdbDataToCollection({imdbID}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

