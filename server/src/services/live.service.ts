import { Injectable } from '@nestjs/common';
import { BehaviorSubject, interval, tap } from 'rxjs';
import { ILive } from 'src/models/live.interface';
import { LIVE_ACTIONS } from 'src/store/live.action';

@Injectable()
export class LiveService {
  dataControl$ = new BehaviorSubject(null)
  InitData: ILive = {
    events: [{ id: 1, name: 'event-1', status: 'primary' }, { id: 2, name: 'event-2', status: 'success' }],
    markets: [{ id: 1, name: 'market-1', status: 'danger' }, { id: 2, name: 'market-2', status: 'warning' }]
  }
  liveInitData = { events: [...this.InitData.events] , markets: [...this.InitData.markets]}
  constructor() { }

  fetchData() {
    this.dataControl$.next({ event: LIVE_ACTIONS.LOAD_LIVES, data: this.liveInitData });
    interval(2000).subscribe((t) => {
      if (((t + 1) % 3) == 0) this.updateData()
      if (((t + 1) % 5) == 0 && this.liveInitData.events.length > 4 && this.liveInitData.markets.length > 4) this.deleteData()
      if (((t + 1) % 2) == 0 && this.liveInitData.events.length <= 10 && this.liveInitData.markets.length <= 10)
        this.addData()
      if(this.liveInitData.events.length == 10 || this.liveInitData.markets.length == 10)  
        this.resetData()
    })
  }

  updateData() {
    const randomMarketId = +((this.liveInitData.markets.length) / 2).toFixed(0);
    const randomEventID = +((this.liveInitData.events.length) / 2).toFixed(0);
    this.liveInitData.events[randomMarketId].status = (this.liveInitData.markets[randomMarketId].status == 'danger' ? 'warning' : 'primary');
    this.liveInitData.events[randomEventID].status = (this.liveInitData.events[randomEventID].status == 'primary' ? 'success' : 'warning');
    this.dataControl$.next({
      event: LIVE_ACTIONS.UPDATE_LIVES,
      data: {
        events: [{ id: this.liveInitData.events[randomEventID].id, status: this.liveInitData.events[randomEventID].status }],
        markets: [{ id: this.liveInitData.events[randomMarketId].id, status: this.liveInitData.events[randomMarketId].status }],
      }
    })
  }


  addData() {
    const newMarketID = this.liveInitData.markets[this.liveInitData.markets.length - 1].id + 1
    const newMarket = { id: newMarketID, name: `market-${newMarketID}`, status: 'warning' };
    this.liveInitData.markets.push(newMarket);
    const newEventID = this.liveInitData.events[this.liveInitData.events.length - 1].id + 1
    const newEvent = { id: newEventID, name: `Event-${newEventID}`, status: 'primary' };
    this.liveInitData.events.push(newEvent);
    this.dataControl$.next({ event: LIVE_ACTIONS.ADD_LIVES, data: { events: [newEvent], markets: [newMarket] } })
  }

  deleteData() {
    const randomMarketId = +(this.liveInitData.markets.length / 2).toFixed(0);
    const removeEventID = +(this.liveInitData.events.length / 2).toFixed(0);
    this.dataControl$.next({
      event: LIVE_ACTIONS.DELETE_LIVES,
      data: {
        events: [{ id: this.liveInitData.events[removeEventID].id }],
        markets: [{ id: this.liveInitData.markets[randomMarketId].id }]
      }
    })

    this.liveInitData.events = this.liveInitData.events.filter(event => event.id !== removeEventID)
    this.liveInitData.markets = this.liveInitData.markets.filter(market => market.id !== randomMarketId)
  }

  resetData() {
    this.liveInitData = { events: [...this.InitData.events] , markets: [...this.InitData.markets]}
    this.dataControl$.next({ event: LIVE_ACTIONS.LOAD_LIVES, data: this.liveInitData });
  }
}