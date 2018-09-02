import {AUTH} from '../actions/auth-actions';
import {SIGN_OUT} from '@redux/actions/app-actions';

const defaultState = {
  isAuth: false,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH:
      return Object.assign({}, state, {
        isAuth: action.isAuth,
      });
    case SIGN_OUT.SUCCESS:
      return defaultState;
    default:
      return state;
  }
};

export default authReducer;
