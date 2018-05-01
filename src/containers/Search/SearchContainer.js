import {connect} from 'react-redux';
import {Search} from '../../components';
import {searchForAFilm} from '../../redux/actions/search-actions';

/**
 * The final shape of the Search state
 * @typedef {Object} SearchState
 * @property {string} filmName
 * @property {Array<omdbSearchResult>} searchResults
 */

/**
 * @param {object} state
 * @param {SearchState} state.search
 * @return {object}
 */
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

export const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(
  Search
);
