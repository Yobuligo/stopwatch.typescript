import { ifNull } from "@yobuligo/core.typescript";
import { IStopwatch } from "./IStopwatch";
import { IntermediateTime } from "./Types";

class StopwatchDefault implements IStopwatch {
  private startTime?: Date;
  private endTime?: Date;
  private _intermediateTimes: IntermediateTime[] = [];

  public get elapsed(): number {
    if (this.startTime !== undefined) {
      if (this.endTime !== undefined) {
        return this.endTime.getTime() - this.startTime.getTime();
      } else {
        return new Date().getTime() - this.startTime.getTime();
      }
    } else {
      return 0;
    }
  }

  public get intermediateTimes(): IntermediateTime[] {
    return this._intermediateTimes;
  }

  public get isNotRunning(): boolean {
    return !this.isRunning;
  }

  public get isRunning(): boolean {
    return this.startTime !== undefined && this.endTime === undefined;
  }

  reset(): void {
    this.startTime = undefined;
    this.endTime = undefined;
    this._intermediateTimes = [];
  }

  start(text: string = "Start"): void {
    ifNull(this.startTime, () => {
      this.startTime = new Date();
      this.addIntermediateTime(text, this.startTime);
    });
  }

  stop(text: string = "Stop"): void {
    if (this.isRunning) {
      this.endTime = new Date();
      this.addIntermediateTime(text, this.endTime);
    }
  }

  takeIntermediateTime(text: string = "Intermediate time"): void {
    if (this.isRunning) {
      this.addIntermediateTime(text, new Date());
    }
  }

  private addIntermediateTime(text: string, timestamp: Date): void {
    this.intermediateTimes.push({ text, timestamp });
  }
}

export const stopwatch = (): IStopwatch => {
  return new StopwatchDefault();
};
