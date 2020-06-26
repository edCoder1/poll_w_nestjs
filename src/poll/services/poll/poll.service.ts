import { Injectable } from '@nestjs/common';
import { Md5 } from 'ts-md5/dist/md5';

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

  public hashString(id: string): Promise<string | Int32Array> {
    return new Promise((resolve, reject) => {
      resolve(Md5.hashStr(id));
    });
  }
}
