import { AuthState } from '../reducers/auth/auth.reducer';
import { FitState } from '../reducers/mouse/mouse-coordinates.reducer';

export interface AppState {
  fit: FitState;
  auth: AuthState;
  // ... Add future feature states
}
