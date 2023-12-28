// fit.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { FitActions } from '../../actions/fits-actions/fits-actions';
import { MouseCoordinatesState } from '../../../interfaces/mouse-coordinates.state';

export interface FitState {
  coordinates: MouseCoordinatesState;
}

export const initialState: FitState = {
  coordinates: { x: 0, y: 0 },
};

export const fitReducer = createReducer(
  initialState,
  on(
    FitActions.plotFitCoordinate,
    (state, { x, y }): FitState => ({
      ...state,
      coordinates: { x, y },
    })
  )
);
