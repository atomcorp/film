const HIGHLIGHT_REQUEST = 'HIGHLIGHT_REQUEST';
const HIGHLIGHT_SUCCESS = 'HIGHLIGHT_SUCCESS';
const TOGGLE_HIGHLIGHT = 'TOGGLE_HIGHLIGHT';

const highlightRequest = ({imdbID}) => ({
  type: HIGHLIGHT_REQUEST,
  imdbID,
});

const highlightSuccess = ({film}) => ({
  type: HIGHLIGHT_SUCCESS,
  film,
});

const toggleHighlight = () => ({
  type: TOGGLE_HIGHLIGHT,
});

const showHighlight = ({imdbID}) => {
  return (dispatch, getState) => {
    dispatch(highlightRequest({imdbID}));
    const state = getState();
    const film = state.collection.films.filter(
      (film) => film.imdbID === imdbID
    );
    dispatch(highlightSuccess({film: film[0]}));
    dispatch(toggleHighlight());
  };
};

export {HIGHLIGHT_REQUEST, HIGHLIGHT_SUCCESS, showHighlight, TOGGLE_HIGHLIGHT};
