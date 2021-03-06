import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  addFilmImdbDataToCollection,
} from '../../redux/actions/collection-actions';

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
const SearchResult = ({Title, imdbID, addFilmImdbDataToCollection, Year}) => (
  <React.Fragment>
    <button onClick={() => addFilmImdbDataToCollection({imdbID})}>
      {Title} ({Year})
    </button>
    <br />
  </React.Fragment>
);

SearchResult.propTypes = {
  Title: PropTypes.string,
  imdbID: PropTypes.string,
  addFilmImdbDataToCollection: PropTypes.func,
  Year: PropTypes.string,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addFilmImdbDataToCollection: ({imdbID}) => {
    dispatch(addFilmImdbDataToCollection({imdbID}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
