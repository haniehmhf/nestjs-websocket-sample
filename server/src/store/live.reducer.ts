
import { ILive } from 'src/models/live.interface';
import { LIVE_ACTIONS } from './live.action';

const initialState: ILive = {
  events: [],
  markets: [],
};

export function LiveReducer(state: ILive = initialState, action: any): ILive {
  switch (action.type) {
    case LIVE_ACTIONS.LOAD_LIVES : {
      return { ...state, ...action.payload };
    };
    default: {
      return state;
    }
  }
}
export const getLiveState = (state) => state.live;
export const getEventsState = (state: ILive) => state.events;
export const getMarketState = (state: ILive) => state.markets;