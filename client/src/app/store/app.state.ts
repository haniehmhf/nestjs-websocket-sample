import { LiveReducer } from './live/live.reducer';
import { LIVE_STATE_NAME } from './live/live.selector';
import { ILiveState } from './live/live.state';

export interface AppState {
  [LIVE_STATE_NAME]: ILiveState;
}

export const appReducer = {
  [LIVE_STATE_NAME]: LiveReducer,
};
