import { ifNull } from "@yobuligo/core.typescript";
import { IStopwatch } from "./IStopwatch";
import { IntermediateTime } from "./Types";

class StopwatchDefault implements IStopwatch {
  private _startedAt?: Date;
  private _stoppedAt?: Date;
  private _intermediateTimes: IntermediateTime[] = [];

  public get elapsed(): number {
    if (this._startedAt !== undefined) {
      if (this._stoppedAt !== undefined) {
        return this._stoppedAt.getTime() - this._startedAt.getTime();
      } else {
        return new Date().getTime() - this._startedAt.getTime();
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
    return this._startedAt !== undefined && this._stoppedAt === undefined;
  }

  reset(): void {
    this._startedAt = undefined;
    this._stoppedAt = undefined;
    this._intermediateTimes = [];
  }

  start(text: string = "Start"): Date {
    ifNull(this._startedAt, () => {
      this._startedAt = new Date();
      this.addIntermediateTime(text, this._startedAt);
    });
    return this._startedAt!;
  }

  public get startedAt(): Date | undefined {
    return this._startedAt;
  }

  stop(text: string = "Stop"): Date | undefined {
    if (this.isRunning) {
      this._stoppedAt = new Date();
      this.addIntermediateTime(text, this._stoppedAt);
    }
    return this._stoppedAt;
  }

  public get stoppedAt(): Date | undefined {
    return this._stoppedAt;
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

export const createStopwatch = (): IStopwatch => {
  return new StopwatchDefault();
};

export const Stopwatch = createStopwatch();
