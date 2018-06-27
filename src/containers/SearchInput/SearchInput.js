/** @module containers/Search */
import {connect} from 'react-redux';
import {searchForAFilm, newSearch} from '../../redux/actions/search-actions';
import Search from '../../components/Search/Search';

const mapStateToProps = (state) => ({});

/**
 * @param {Dispatch} dispatch - redux function
 * @return {object}
 */
const mapDispatchToProps = (dispatch) => ({
  searchForAFilm: ({filmName, year}) =>
    dispatch(
      searchForAFilm({
        filmName,
        year,
      })
    ),
  newSearch: () => dispatch(newSearch()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
