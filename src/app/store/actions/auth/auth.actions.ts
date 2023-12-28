import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ User: firebase.default.User | null }>(),
    logout: emptyProps(),
  },
});
