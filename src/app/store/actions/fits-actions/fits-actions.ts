import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MouseCoordinatesState } from '../../../interfaces/mouse-coordinates.state';

export const FitActions = createActionGroup({
  source: 'Fit Actions',
  events: {
    clearAllCoordinates: emptyProps(),
    getAllFitCoordinates: emptyProps(),
    plotFitCoordinate: props<MouseCoordinatesState>(),
  },
});
