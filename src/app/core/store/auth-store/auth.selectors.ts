import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../models/auth-state';

export const getAuthState = createFeatureSelector('auth');
export const getUser = createSelector(
  getAuthState,
  (state: AuthState) => state.user
);
export const getLoginError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);
