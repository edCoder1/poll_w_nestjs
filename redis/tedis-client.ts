import { Injectable } from '@nestjs/common';
import { Tedis } from 'redis-typescript';

@Injectable()
export class RedisAsyncClient {
  async getRedisAsyncClient(): Promise<Tedis> {
    // auth
    const tedis = new Tedis({
      port: 6379,
      host: '127.0.0.1',
      // password: "your_password"
    });
    tedis.on('error', e => {
      console.log('Error while connecting to redis...');
      console.log(e);
    });
    tedis.on('connect', () => {
      console.log('Connected to redis...');
    });

    return tedis;
  }
}
