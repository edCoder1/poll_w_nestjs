import { Module } from '@nestjs/common';
import { EntryController } from './entry/entry.controller';
import { PollService } from './services/poll/poll.service';
import { RedisAsyncClient } from 'redis/tedis-client';

@Module({
  controllers: [EntryController],
  providers: [PollService, RedisAsyncClient],
})
export class PollModule {}
