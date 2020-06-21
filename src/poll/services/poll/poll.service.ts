import { Injectable } from '@nestjs/common';

@Injectable()
export class PollService {
  constructor() {}

  private timeoutPromise(timeout: number, value: string): Promise<string> {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve(value);
      }, timeout),
    );
  }

  public returnPromise(millis: number, value: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(this.timeoutPromise(millis, value));
    });
  }
}
