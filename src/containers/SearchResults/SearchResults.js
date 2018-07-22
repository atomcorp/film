import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SearchResult} from '../';
import {SearchPager} from '../../components/';
import {turnPagerAndGetNewSearchResults} from '../../redux/actions/search-actions';

const SearchResults = ({search, turnPager}) => (
  <div className="search-results">
    {search.isSearching && 'Loading...'}
    {!search.isSearching &&
      search.searchResults.map((result) => (
        <SearchResult key={result.imdbID} {...result} />
      ))}
    {search.totalPages > 1 && (
      <SearchPager
        currentPage={search.currentPage}
        totalPages={search.totalPages}
        handlePager={turnPager}
      />
    )}
  </div>
);

SearchResults.propTypes = {
  search: PropTypes.shape({
    searchResults: PropTypes.arrayOf(
      PropTypes.shape({
        Title: PropTypes.string,
      })
    ),
  }),
  turnPager: PropTypes.func,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch) => ({
  turnPager: ({page}) => {
    dispatch(turnPagerAndGetNewSearchResults({page}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
