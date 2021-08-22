
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import {join} from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); 
   app.useWebSocketAdapter(new WsAdapter(app));
   app.useStaticAssets(join(__dirname,'..','static'))
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
