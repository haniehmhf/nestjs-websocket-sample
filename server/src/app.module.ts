import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LiveSocketGateway } from './gateway/live-socket.gateway';
import { ConfigModule } from '@nestjs/config';
import { LiveService } from './services/live.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [LiveService,LiveSocketGateway],
})
export class AppModule {}
