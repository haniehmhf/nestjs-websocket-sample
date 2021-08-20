import { IEvent, IMarket } from "src/app/models/live.interface";


export interface ILiveState {
  events: IEvent[];
  markets: IMarket[];
}

export const initialState: ILiveState = {
  events: [],
  markets: [],
};
