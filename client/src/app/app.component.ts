import { ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, skip, takeUntil } from 'rxjs/operators';
import { SocketService } from './service/socket.service';
import { LIVE_ACTIONS } from './store/live/live.action';
import { getLiveState } from './store/live/live.selector';
import { ILiveState } from './store/live/live.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  disable = false;
  liveData: any;
  loading = true;
  destroy$ = new Subject
  constructor(
    private socketService: SocketService,
    public store: Store,
    private cd: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.store.select(getLiveState)
      .pipe(
        skip(1),
        takeUntil(this.destroy$)
      ).subscribe(res => {
        this.liveData = res;
        this.loading = false;
        this.cd.markForCheck()
      })
  }

  emit() {
    this.disable = true;
    this.socketService.emitAction(LIVE_ACTIONS.LOAD_LIVES);
  }

  ngOnDestroy(): void {
    this.socketService.close();
    this.destroy$.next()
  }
}
