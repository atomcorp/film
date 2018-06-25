import {API_KEY} from '../../config/api';
export const SEARCH_ATTEMPT = 'SEARCH_ATTEMPT';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAIL = 'SEARCH_FAIL';
export const TURN_PAGER = 'TURN_PAGER';

/**
 * @description Set the search paramaters
 * @param {object} searchParams - What to search for
 * @param {string} search.filmName - Name of the film
 * @return {Object} searchParams
 */
export const searchAttempt = ({filmName}) => ({
  type: SEARCH_ATTEMPT,
  filmName,
});

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
 * Returns an array of the successful search results
 * @param {Array<omdbSearchResult>} searchResults
 * @return {object}
 */
export const searchSuccess = ({searchResults, totalResults}) => ({
  type: SEARCH_SUCCESS,
  searchResults,
  totalResults,
});

const turnPager = ({page}) => ({
  type: TURN_PAGER,
  page,
});

/**
 * Returns a string with the servers
 * reason for the failed search
 * @param {string} error
 * @return {object}
 */
export const searchFail = (error) => ({
  type: SEARCH_FAIL,
  message: error,
});

export const searchForAFilm = ({filmName}) => {
  return (dispatch, getState) => {
    dispatch(
      searchAttempt({
        filmName,
      })
    );
    const searchState = getState().search;
    fetch(
      /* eslint-disable-next-line max-len */
      `//omdbapi.com/?apikey=${API_KEY}&type=movie&plot=full&page=${
        searchState.currentPage
      }&s=${encodeURIComponent(filmName)}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.Response === 'False') {
          throw new Error(res.Error);
        }
        dispatch(searchSuccess({
          searchResults: res.Search,
          totalResults: res.totalResults,
        }));
      })
      .catch((err) => {
        dispatch(searchFail(err.message));
      });
  };
};

export const turnPagerAndGetNewSearchResults = ({page}) => {
  return (dispatch, getState) => {
    dispatch(
      turnPager({
        page,
      })
    );
    const searchState = getState().search;
    dispatch(
      searchForAFilm({
        filmName: searchState.filmName,
      })
    );
  };
};
