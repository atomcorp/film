const HIGHLIGHT_REQUEST = 'HIGHLIGHT_REQUEST';
const HIGHLIGHT_SUCCESS = 'HIGHLIGHT_SUCCESS';

const highlightRequest = ({imdbID}) => ({
  type: HIGHLIGHT_REQUEST,
  imdbID,
});

const highlightSuccess = ({film}) => ({
  type: HIGHLIGHT_SUCCESS,
  film,
});

const addHighlight = ({imdbID}) => {
  return (dispatch, getState) => {
    dispatch(highlightRequest({imdbID}));
    const state = getState();
    const film = state.collection.films.filter(
      (film) => film.imdbID === imdbID
    );
    dispatch(highlightSuccess({film: film[0]}));
  };
};

export {HIGHLIGHT_REQUEST, HIGHLIGHT_SUCCESS, addHighlight};
