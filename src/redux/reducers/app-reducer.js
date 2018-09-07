import {COLLECTION_VISIBILITY} from '../actions/collection-actions';
import {
  SIGN_IN_TO_FIREBASE,
  SIGN_OUT,
  SIGN_UP_WITH_FIREBASE_AUTH,
  INIT_USER,
  INIT_APP,
  UPDATE_COLLECTION_SIDEBAR_WIDTH,
} from '../actions/app-actions';
import {GET_USER_DATA} from '../actions/user-actions';

// TODO: This state needs to be broken up
// some of it does nothing

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
  isInitilisingApp: false,
  collectionSidebarWidth: 300,
};

const app = (state = defaultState, action) => {
  switch (action.type) {
    case SIGN_UP_WITH_FIREBASE_AUTH.ATTEMPT:
      return Object.assign({}, state, {
        isSigningUp: true,
      });
    case SIGN_UP_WITH_FIREBASE_AUTH.SUCCESS:
      return Object.assign({}, state, {
        isSigningUp: false,
        isSignedIntoFirebase: false,
      });
    case SIGN_UP_WITH_FIREBASE_AUTH.FAIL:
      return Object.assign({}, state, {
        isSigningUp: false,
        signUpFail: true,
        signUpMessage: [...action.message],
      });
    case SIGN_IN_TO_FIREBASE.ATTEMPT:
      return Object.assign({}, state, {
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
      return Object.assign({}, state, {
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
    case INIT_APP.START:
      return Object.assign({}, state, {
        isInitilisingApp: true,
      });
    case INIT_APP.FINISH:
      return Object.assign({}, state, {
        isInitilisingApp: false,
      });
    case SIGN_OUT.SUCCESS:
      return defaultState;
    case UPDATE_COLLECTION_SIDEBAR_WIDTH:
      return Object.assign({}, state, {
        collectionSidebarWidth: false,
      });
    case GET_USER_DATA.FAIL:
      return defaultState;
    case SIGN_OUT.ATTEMPT:
    default:
      return state;
  }
};

export default app;
