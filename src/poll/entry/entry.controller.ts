import { Controller, Get, Query } from '@nestjs/common';
import { PollService } from '../services/poll/poll.service';
import { RedisAsyncClient } from '../../../redis/tedis-client';
import { Tedis } from 'redis-typescript';

@Controller('entry')
export class EntryController {
  constructor(
    private _pollService: PollService,
    private readonly REDIS: RedisAsyncClient,
  ) {}

  @Get('get')
  public async getSomething(
    @Query('millis') millis: number,
    @Query('string') string: string | Int32Array,
  ): Promise<string | Int32Array> {
    return await this._pollService.returnPromise(millis, string);
  }

  @Get('poll')
  public async pollStatus(@Query('id') id: string): Promise<object> {
    const redisClient: Tedis = await this.REDIS.getRedisAsyncClient();

    return await redisClient.hgetall(id);
  }

  @Get('longProcess')
  public async trigger(@Query('millis') millis: number) {
    const hash: string | Int32Array = await this._pollService.hashString(
      Math.random().toString(),
    );

    const storedData: string = JSON.stringify({
      id: Math.random(),
      name: 'some random name',
      values: 'some weird values',
    });

    console.log(millis);

    let status: any = {
      status: 'STARTED',
      message: 'Long Process Started',
      hash,
      storedData,
    };

    const redisClient: Tedis = await this.REDIS.getRedisAsyncClient();

    redisClient.hmset(<string>hash, status);

    this._pollService
      .returnPromise(millis, hash)
      .then(async (res: string | Int32Array) => {
        console.log(res);

        status = {
          status: 'COMPLETE',
          message: 'Long Process Completed',
          hash: res,
          storedData,
        };

        redisClient.hmset(<string>hash, status);
      });

    return status;
  }

  @Get('test')
  public async testRedis(
    @Query('id') id: string,
  ): Promise<string | Int32Array> {
    // const hash: string | Int32Array = await this._pollService.hashString(id);

    const redisClient: Tedis = await this.REDIS.getRedisAsyncClient();

    // console.log(redisClient);

    // console.log(await redisClient.command('SCAN', 0));

    // await redisClient.hmset(id, {
    //   name: 'tedis',
    //   age: 18,
    // });

    console.log(await redisClient.keys('*')); // Red somewhere .keys function is dangerous for PROD
    console.log(await (await redisClient.keys('*')).length); // Red somewhere .keys function is dangerous for PROD

    console.log(await redisClient.hgetall(id));

    return id;
  }
}
