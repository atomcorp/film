import {COLLECTION_VISIBILITY} from '../actions/collection-actions';
import {SIGN_IN, SIGN_OUT, SIGN_UP} from '../actions/app-actions';

const defaultState = {
  isAuthenticated: false,
  addingFilm: false,
  visibility: COLLECTION_VISIBILITY.SHOW_ALL,
  isSigningIn: false,
  signInFail: false,
  signInFailMessage: [],
  isSigningUp: false,
  signUpFail: false,
  signUpMessage: [],
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
        signInFailMessage: [...action.message],
      });
    case SIGN_OUT.SUCCESS:
      return defaultState;
    default:
      return state;
  }
};

export default app;
