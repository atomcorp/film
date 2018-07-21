import {COLLECTION_VISIBILITY} from '../actions/collection-actions';
import {SIGN_IN, SIGN_OUT, SIGN_UP, INIT_USER} from '../actions/app-actions';

const defaultState = {
  isAuthenticated: false,
  addingFilm: false,
  visibility: COLLECTION_VISIBILITY.SHOW_ALL,
  isSigningIn: false,
  signInFail: false,
  signInMessage: [],
  isSigningUp: false,
  signUpFail: false,
  signUpMessage: [],
  isInitilising: false,
  hasInitialisingFailed: false,
  initialisingFailureReason: [],
};

const app = (state = defaultState, action) => {
  switch (action.type) {
    case SIGN_UP.ATTEMPT:
      return Object.assign({}, defaultState, {
        isSigningUp: true,
      });
    case SIGN_UP.SUCCESS:
      return Object.assign({}, state, {
        isSigningUp: false,
        isAuthenticated: false,
      });
    case SIGN_UP.FAIL:
      return Object.assign({}, state, {
        isSigningUp: false,
        signUpFail: true,
        signUpMessage: [...action.message],
      });
    case SIGN_IN.ATTEMPT:
      return Object.assign({}, defaultState, {
        isSigningIn: true,
      });
    case SIGN_IN.SUCCESS:
      return Object.assign({}, state, {
        isSigningIn: false,
        isAuthenticated: true,
      });
    case SIGN_IN.FAIL:
      return Object.assign({}, state, {
        isSigningIn: false,
        isAuthenticated: false,
        signInFail: true,
        signInMessage: [...action.message],
      });
    case INIT_USER.ATTEMPT:
      return Object.assign({}, defaultState, {
        isInitilising: true,
      });
    case INIT_USER.SUCCESS:
      return Object.assign({}, state, {
        isInitilising: false,
        name: action.name,
        email: action.email,
        id: action.id,
      });
    case INIT_USER.FAIL:
      return Object.assign({}, state, {
        isInitilising: false,
        hasInitialisingFailed: true,
        initialisingFailureReason: [...action.message],
      });

    case SIGN_OUT.ATTEMPT:
    case SIGN_OUT.SUCCESS:
      return defaultState;
    default:
      return state;
  }
};

export default app;
