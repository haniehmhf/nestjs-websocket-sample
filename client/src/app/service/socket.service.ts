import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket'
import { filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: any;

  constructor(public store: Store) {
    this.socket = webSocket("ws://localhost:8080");
  }

  emitAction(action: string) {
    this.socket.next({ event: action });
    this.socket.subscribe((res:any) => {
       this.store.dispatch({ type: res.event, payload: res.data })
    })
  }


}
