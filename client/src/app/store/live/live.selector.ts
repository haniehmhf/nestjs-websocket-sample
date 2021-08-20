import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ILiveState } from './live.state';

export const LIVE_STATE_NAME = 'live';
export const getLiveState = createFeatureSelector<ILiveState>(LIVE_STATE_NAME);

export const getLiveEvents = createSelector(getLiveState, ({ events }) => {
  return events;
});

export const getLiveMarkets = createSelector(getLiveState, ({ markets }) => {
  return markets;
});

