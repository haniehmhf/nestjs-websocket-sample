import { Injectable } from '@nestjs/common';
import { BehaviorSubject, interval, tap } from 'rxjs';
import { ILive } from 'src/models/live.interface';
import { LIVE_ACTIONS } from 'src/store/live.action';

@Injectable()
export class LiveService {
  dataControl$ = new BehaviorSubject(null)
  liveInitData: ILive = {
    events: [{ id: 1, name: 'event-1', status: 'danger' }, { id: 2, name: 'event-2', status: 'warning' }],
    markets: [{ id: 1, name: 'market-1', status: 'danger' }, { id: 2, name: 'market-2', status: 'warning' }]
  }
  constructor() {}

  fetchData() {
    this.dataControl$.next({ event: LIVE_ACTIONS.LOAD_LIVES , data: this.liveInitData });
    interval(2000).subscribe((t) => {            
      if(((t + 1) % 2) == 0) {
        this.liveInitData.events[0].status = (this.liveInitData.events[0].status == 'danger' ? 'warning' : 'danger');
        this.dataControl$.next({event: LIVE_ACTIONS.UPDATE_LIVES , data: { events : [{id : 1 , status: this.liveInitData.events[0].status}]}})
      } 
      if (((t + 1) % 3) == 0) {        
        if(this.liveInitData.events.length < 20 && this.liveInitData.markets.length < 20) {
          const newMarketID = this.liveInitData.markets.length + 1
          const newMarket = { id : newMarketID , name: `market-${newMarketID}` , status:'success'};
          this.liveInitData.markets.push(newMarket);
          const newEventID = this.liveInitData.events.length + 1
          const newEvent = { id : newEventID , name: `Event-${newEventID}` , status:'primary'};
          this.liveInitData.events.push(newEvent);
          this.dataControl$.next({event: LIVE_ACTIONS.ADD_LIVES, data: { events: [newEvent] , markets: [newMarket] }})
        }
      }  
      if(((t + 1) % 5) == 0) {        
        const removeId = +(this.liveInitData.markets.length / 2).toFixed(0);
        this.dataControl$.next({event: LIVE_ACTIONS.DELETE_LIVES, data: { markets: [{id : removeId}] }})
      } 
    })
  }
}