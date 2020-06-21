import { Module } from '@nestjs/common';
import { EntryController } from './entry/entry.controller';
import { PollService } from './services/poll/poll.service';

@Module({
  controllers: [EntryController],
  providers: [PollService]
})
export class PollModule {}
