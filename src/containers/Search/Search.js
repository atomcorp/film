/** @module containers/Search */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SearchResults} from '../';
import {throttle as _throttle} from '../../helpers';
import {connect} from 'react-redux';
import {searchForAFilm} from '../../redux/actions/search-actions';

/**
  @typedef SearchState
  @type {object}
  @property {string} filmName -the filmName typed
 */

/**
  @typedef Props
  @type {object}
  @property {Array<omdbSearchResult>} searchResults -the filmName typed
  @property {func} searchForAFilm
 */

/** Class representing searching for a movie */
class Search extends Component {
  /**
   * Search constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    /** @type {SearchState} */
    this.state = {
      filmName: '',
    };
    this.throttleSearchForFilm = _throttle(this.props.searchForAFilm, 1000);
  }
  /**
   * @param {InputChange} event Text changed in input
   * @listens InputChange
   */
  handleChange = (event) => {
    this.setState({
      filmName: event.currentTarget.value,
    });
    this.throttleSearchForFilm(event.currentTarget.value);
  };
  /**
   * @param {FormSubmit} event Search form submitted
   * @listens InputChange
   */
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.searchForAFilm(this.state.filmName);
  };
  /** @return {HTML} Search */
  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.filmName}
            onChange={this.handleChange}
          />
          <input type="submit" value="Search" />
          <br />
          Film name: {this.props.search ? this.props.search.filmName : null}
          <br />
          Film results:{' '}
          {this.props.search && this.props.search.searchResults ? (
            <SearchResults searchResults={this.props.search.searchResults} />
          ) : null}
          Film messages: {this.props.search ? this.props.search.message : null}
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  searchForAFilm: PropTypes.func,
  search: PropTypes.shape({
    filmName: PropTypes.string,
    searchResults: PropTypes.arrayOf(
      PropTypes.shape({
        Title: PropTypes.string,
      })
    ),
    message: PropTypes.string,
  }),
};

const mapStateToProps = (state) => ({
  search: state.search,
});

/**
 * @param {Dispatch} dispatch - redux function
 * @return {object}
 */
const mapDispatchToProps = (dispatch) => ({
  searchForAFilm: (filmName) =>
    dispatch(
      searchForAFilm({
        filmName,
      })
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
