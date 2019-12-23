import { AuthActionTypes, LOGIN_SUCCESS, LOGIN_FAIL, SET_USER } from '../actions/auth.actions';
import { AuthState } from '../models/auth-state';

export const initialState: AuthState = {
  user: null,
  error: '',
};

export const authReducers = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: '',
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: 'User login or password is incorrect',
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
