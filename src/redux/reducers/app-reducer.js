import {COLLECTION_VISIBILITY} from '../actions/collection-actions';
import {
  SIGN_IN_TO_FIREBASE,
  SIGN_OUT,
  SIGN_UP,
  INIT_USER,
  INIT_APP_DONE,
} from '../actions/app-actions';

const defaultState = {
  isSignedIntoFirebase: false,
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
  hasInitialised: false,
  name: '',
  email: '',
  id: '',
  isInitilisingApp: true,
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
        isSignedIntoFirebase: false,
      });
    case SIGN_UP.FAIL:
      return Object.assign({}, state, {
        isSigningUp: false,
        signUpFail: true,
        signUpMessage: [...action.message],
      });
    case SIGN_IN_TO_FIREBASE.ATTEMPT:
      return Object.assign({}, defaultState, {
        isSigningIn: true,
      });
    case SIGN_IN_TO_FIREBASE.SUCCESS:
      return Object.assign({}, state, {
        isSigningIn: false,
        isSignedIntoFirebase: true,
      });
    case SIGN_IN_TO_FIREBASE.FAIL:
      return Object.assign({}, state, {
        isSigningIn: false,
        isSignedIntoFirebase: false,
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
        hasInitialised: true,
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
    case INIT_APP_DONE:
      return Object.assign({}, state, {
        isInitilisingApp: false,
      });
    case SIGN_OUT.SUCCESS:
      return Object.assign({}, defaultState, {
        isInitilisingApp: false,
      });
    case SIGN_OUT.ATTEMPT:
    default:
      return state;
  }
};

export default app;
