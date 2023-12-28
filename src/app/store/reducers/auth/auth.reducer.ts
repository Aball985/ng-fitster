import { createReducer, on } from '@ngrx/store';
import { authActions } from '../../actions/auth/auth.actions';

export interface AuthState {
  loginState: LoginState;
}

export interface LoginState {
  isLoggedIn: boolean;
  user: firebase.default.User | null;
}

export const initialState: AuthState = {
  loginState: {
    isLoggedIn: false,
    user: null,
  },
};

export const authReducer = createReducer(
  initialState,
  on(
    authActions.login,
    (state, { User }): AuthState => ({
      ...state,
      loginState: {
        isLoggedIn: true,
        user: User,
      },
    })
  ),
  on(
    authActions.logout,
    (state): AuthState => ({
      ...state,
      loginState: {
        isLoggedIn: false,
        user: null,
      },
    })
  )
);
