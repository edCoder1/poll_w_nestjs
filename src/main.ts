import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as AsyncRedis from 'async-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Server running...');
}

async function createClientAndConnectToRedis() {
  const asyncClient = await AsyncRedis.createClient({
    port: 6379,
    // more settings here
  });

  console.log(asyncClient.server_info);

  asyncClient.on('error', e => {
    console.log('Error while connecting to redis...');
    console.log(e);
  });
  asyncClient.on('connect', () => {
    console.log('Connected to redis...');
  });
}

bootstrap();
createClientAndConnectToRedis();
