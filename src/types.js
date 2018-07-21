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
