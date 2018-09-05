/** @module containers/Search */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {staggerRequests as _staggerRequests} from '../../helpers';

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
  @property {func} newSearch
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
      filmName: 'Star Wars',
      year: '',
      advanced: false,
      page: 1,
    };
    this.staggerFilmSearchRequests = _staggerRequests(500);
  }
  /**
   * @param {InputChange} event Text changed in input
   * @param {string} key
   * @listens InputChange
   */
  handleChange = (event, key) => {
    const value = event.currentTarget.value;
    this.setState({
      [key]: value,
    });
    this.staggerFilmSearchRequests(() => {
      this.props.newSearch();
      this.props.searchForAFilm({
        filmName: this.state.filmName,
        year: this.state.year,
      });
    });
  };
  /**
   * @param {FormSubmit} event Search form submitted
   * @listens InputChange
   */
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.newSearch();
    this.props.searchForAFilm({
      filmName: this.state.filmName,
      year: this.state.year,
    });
  };
  toggleAdvanced = () => {
    this.setState({
      advanced: !this.state.advanced,
      year: !this.state.advanced ? this.state.year : '',
    });
  };
  /** @return {HTML} Search */
  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              value={this.state.filmName}
              onChange={(e) => this.handleChange(e, 'filmName')}
            />
            <input type="submit" value="Search" />
          </div>
          {this.state.advanced && (
            <div>
              Year:{' '}
              <input
                value={this.state.year}
                onChange={(e) => this.handleChange(e, 'year')}
              />
            </div>
          )}
        </form>
        <button onClick={this.toggleAdvanced}>Advanced</button>
      </div>
    );
  }
}

Search.propTypes = {
  searchForAFilm: PropTypes.func,
  newSearch: PropTypes.func,
};

export default Search;
