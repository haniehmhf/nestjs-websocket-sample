
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { Logger } from '@nestjs/common';
import { LiveService } from 'src/services/live.service';
import { LIVE_ACTIONS } from 'src/store/live.action';
import { filter, map, tap } from 'rxjs';

@WebSocketGateway(8080)
export class LiveSocketGateway {
    private logger: Logger = new Logger('AppGateway')

    constructor(
        public liveService: LiveService,
    ) { }
    @WebSocketServer()
    server: Server;

    @SubscribeMessage(LIVE_ACTIONS.LOAD_LIVES)
    handleLive() {
        this.liveService.fetchData();
        return this.liveService.dataControl$.asObservable()
            .pipe(map((data) => (data)))
    }

    handleConnection(client, ...args: any[]) {
        this.logger.log('User connected')
    }

    handleDisconnect(client) {
        this.logger.log('User disconnected')
    }

    afterInit(server: Server) {
        this.logger.log('Initialized')
    }
}
