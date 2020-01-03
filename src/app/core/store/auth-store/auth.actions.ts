import { Action } from '@ngrx/store';

import { LoginPayload } from '../models/login-payload';
import { LoginResponse, User } from '../../entities';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login successful';
export const LOGIN_FAIL = '[Auth] Login failed';
export const LOGOUT = '[Auth] Logout';
export const GET_USER = '[Auth] Get user';
export const SET_USER = '[Auth] Set user';

export class LoginAction implements Action {
  readonly type = LOGIN;
  constructor(public payload: LoginPayload) { }
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: LoginResponse) { }
}

export class LoginFailAction implements Action {
  readonly type = LOGIN_FAIL;
  constructor() { }
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
  constructor() { }
}

export class GetUserAction implements Action {
  readonly type = GET_USER;
  constructor() {}
}

export class SetUserAction implements Action {
  readonly type = SET_USER;
  constructor(public payload: User) {}
}

export type AuthActionTypes =
  LoginAction |
  LoginSuccessAction |
  LoginFailAction |
  LogoutAction |
  GetUserAction |
  SetUserAction;
