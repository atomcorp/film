import PropTypes from 'prop-types';

export const appStateType = PropTypes.shape({
  isAuthenticated: PropTypes.bool,
  addingFilm: PropTypes.bool,
  visibility: PropTypes.string,
  isSigningIn: PropTypes.bool,
  signInFail: PropTypes.bool,
  signInFailMessage: PropTypes.array,
  isSigningUp: PropTypes.bool,
  signUpFail: PropTypes.bool,
  signUpMessage: PropTypes.array,
  isInitilising: PropTypes.bool,
  hasInitialisingFailed: PropTypes.bool,
  initialisingFailureReason: PropTypes.array,
  hasInitialised: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.string,
});

export const userStateType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  collections: PropTypes.arrayOf(PropTypes.string),
  watched: PropTypes.arrayOf(PropTypes.string),
  loved: PropTypes.arrayOf(PropTypes.string),
  downloadingData: PropTypes.bool,
  downloadingDataFailed: PropTypes.bool,
  downloadedData: PropTypes.bool,
});

export const collectionStateType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  admin: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.string),
  public: PropTypes.bool,
});

export const omdbFilm = PropTypes.shape({
  Title: PropTypes.string,
  Director: PropTypes.string,
  imdbID: PropTypes.string,
  Year: PropTypes.string,
  Genre: PropTypes.string,
  Writer: PropTypes.string,
  Actors: PropTypes.string,
  Plot: PropTypes.string,
  Language: PropTypes.string,
  Country: PropTypes.string,
  Awards: PropTypes.string,
  Poster: PropTypes.string,
  Ratings: PropTypes.arrayOf(
    PropTypes.shape({
      Source: PropTypes.string,
      Value: PropTypes.string,
    })
  ),
  Production: PropTypes.string,
  Website: PropTypes.string,
});
