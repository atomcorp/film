import {AUTH} from '../actions/auth-actions';

const defaultState = {
  isAuth: false,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH:
      return Object.assign({}, state, {
        isAuth: action.isAuth,
      });
    default:
      return state;
  }
};

export default authReducer;
