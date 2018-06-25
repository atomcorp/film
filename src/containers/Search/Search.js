/** @module containers/Search */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {staggerRequests as _staggerRequests} from '../../helpers';
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
      filmName: 'Burning',
      year: 2018,
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
    const filmName = event.currentTarget.value;
    this.setState({
      filmName,
    });
    this.staggerFilmSearchRequests(() =>
      this.props.searchForAFilm({
        filmName: this.state.filmName,
      })
    );
  };
  /**
   * @param {FormSubmit} event Search form submitted
   * @listens InputChange
   */
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.searchForAFilm({
      filmName: this.state.filmName,
    });
  };
  toggleAdvanced = () => {
    this.setState({
      advanced: !this.state.advanced,
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
              onChange={this.handleChange}
            />
            <input type="submit" value="Search" />
          </div>
          {this.state.advanced && (
            <div>
              Year: <input onChange={this.handleChange} />
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
};

const mapStateToProps = (state) => ({});

/**
 * @param {Dispatch} dispatch - redux function
 * @return {object}
 */
const mapDispatchToProps = (dispatch) => ({
  searchForAFilm: ({filmName}) =>
    dispatch(
      searchForAFilm({
        filmName,
      })
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
