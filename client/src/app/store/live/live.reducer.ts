import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { ILive } from 'src/app/models/live.interface';
import { addLiveAction, deleteLiveAction, loadLiveAction, updateLiveAction } from './live.action';
import { ILiveState, initialState } from './live.state';


export const adapter: EntityAdapter<ILiveState> = createEntityAdapter<ILive>();

// export const initialState: State = adapter.getInitialState({
//   // additional entity state properties
//   selectedUserId: null,
// });
const _liveReducer = createReducer(
  initialState,
  on(loadLiveAction, (state, action:any) => {
    return {
      ...state , ...action.payload
    };
  }),
  on(addLiveAction, (state, action:any) => {
    let events = [ ...state.events ];
    let markets = [ ...state.markets ];
    if(action.payload.events) events = [...state.events,...action.payload.events]
    if(action.payload.markets) markets = [...state.markets,...action.payload.markets]
    const newState = { events , markets }
    return {
      ...newState,
    };
  }),
  on(updateLiveAction, (state, action:any) => {
    let events: any = [ ...state.events ];
    let markets = [ ...state.markets ];
    if(action.payload.events) {
      action.payload.events.forEach((e:any) => {
        events = events.map((item:any) => {
          if(item.id == e.id)
            return {...item , ...e}
          else return item
        })
      })
    }
    if(action.payload.markets) {
      action.payload.markets.forEach((e:any) => {
        markets = markets.map((item:any) => {
          if(item.id == e.id)
            return {...item , ...e}
          else return item
        })
      })
    }
    const newState = { events , markets }
    return {
      ...newState,
    };
  }),
  on(deleteLiveAction, (state, action:any) => {
    let events: any = [ ...state.events ];
    let markets = [ ...state.markets ];
    if(action.payload.events) {
      action.payload.events.forEach((e:any) => {
        events = events.filter((item:any) => item.id !== e.id)
      })
    }
    if(action.payload.markets) {
      action.payload.markets.forEach((e:any) => {
        markets = markets.filter((item:any) => item.id !== e.id)
      })
    }
    const newState = { events , markets }
    return {
      ...newState,
    };
  })
);

export function LiveReducer(state: any, action: any) {
  return _liveReducer(state, action);
}
