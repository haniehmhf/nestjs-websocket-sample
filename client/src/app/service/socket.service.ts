import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket'
import { filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: any = new Subject();

  constructor(public store: Store) {
    this.socket = webSocket("wss://nest-socket-demo.herokuapp.com");
  }

  emitAction(action: string) {
    this.socket.next({ event: action });
    this.socket.subscribe((res:any) => {
       this.store.dispatch({ type: res.event, payload: res.data })
    })
  }

  close() {
    this.socket.complete();
  }

}
