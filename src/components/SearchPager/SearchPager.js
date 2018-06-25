import React from 'react';
import PropTypes from 'prop-types';

const SearchPager = ({
  currentPage,
  totalPages,
  handlePager,
}) => (
  <div>
    <button
      disabled={
        currentPage === 1
      }
      onClick={
        () => handlePager({page: currentPage - 1})
      }
    >
    Down
    </button>
    {
      currentPage
    } / {
      totalPages
    }
    <button
      disabled={
        currentPage === totalPages
      }
      onClick={
        () => handlePager({page: currentPage + 1})
      }
    >Up</button>
  </div>
);

SearchPager.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  handlePager: PropTypes.func,
};

export default SearchPager;
