import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisAsyncClient } from '../redis/tedis-client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Server running...');
}

bootstrap();
// RedisAsyncClient.prototype.getRedisAsyncClient();
