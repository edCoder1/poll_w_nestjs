import { Controller, Get, Query } from '@nestjs/common';
import { PollService } from '../services/poll/poll.service';

@Controller('entry')
export class EntryController {
  constructor(private _pollService: PollService) {}

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
}
