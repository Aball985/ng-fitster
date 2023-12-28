import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../reducers/auth/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginState.isLoggedIn
);
export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginState.user
);
