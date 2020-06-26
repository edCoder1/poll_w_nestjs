import { Controller, Get, Query } from '@nestjs/common';
import { PollService } from '../services/poll/poll.service';
import { RedisAsyncClient } from '../../../redis/tedis-client';

@Controller('entry')
export class EntryController {
  constructor(
    private _pollService: PollService,
    private readonly REDIS: RedisAsyncClient,
  ) {}

  @Get('get')
  public async getSomething(
    @Query('millis') millis: number,
    @Query('string') string: string,
  ): Promise<string> {
    return await this._pollService.returnPromise(millis, string);
  }

  @Get('poll')
  public pollStatus(@Query('id') id: string): object {
    return {
      status: 200,
      success: true,
      message: `All Correct: ${id}`,
    };
  }

  @Get('test')
  public async testRedis(
    @Query('id') id: string,
  ): Promise<string | Int32Array> {
    const hash: string | Int32Array = await this._pollService.hashString(id);

    const redisClient = await this.REDIS.getRedisAsyncClient();

    // console.log(redisClient);

    await redisClient.hmset(hash, {
      name: 'tedis',
      age: 18,
    });

    console.log(await redisClient.keys('*')); // Red somewhere .keys function is dangerous for PROD

    console.log(await redisClient.hgetall(hash));

    return hash;
  }
}
