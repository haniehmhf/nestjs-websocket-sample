import { createAction, props } from '@ngrx/store';
import { ILiveState } from './live.state';


export enum LIVE_ACTIONS {
  LOAD_LIVES = '[Live] Load',
  ADD_LIVES = '[Live] Add',
  UPDATE_LIVES = '[Live] Update',
  DELETE_LIVES = '[Live] Delete'

}

export const loadLiveAction = createAction(
  LIVE_ACTIONS.LOAD_LIVES,
  props<{ data : ILiveState }>()
);

export const addLiveAction = createAction(
  LIVE_ACTIONS.ADD_LIVES,
  props<{ data : any }>()
);

export const updateLiveAction = createAction(
  LIVE_ACTIONS.UPDATE_LIVES,
  props<{ data: any }>()
);

export const deleteLiveAction = createAction(
  LIVE_ACTIONS.DELETE_LIVES,
  props<{ data: any }>()
);
