import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FitState } from '../../reducers/mouse/mouse-coordinates.reducer';

// Select the feature state slice
export const selectFitState = createFeatureSelector<FitState>('fit');

// Select specific properties from the fit state
export const selectXCoordinate = createSelector(
  selectFitState,
  (state: FitState) => state.coordinates.x
);

export const selectYCoordinate = createSelector(
  selectFitState,
  (state: FitState) => state.coordinates.y
);

// Combine multiple selectors if needed
export const selectCoordinates = createSelector(
  selectXCoordinate,
  selectYCoordinate,
  (x, y) => ({ x, y })
);
