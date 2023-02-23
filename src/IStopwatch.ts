import { IntermediateTime } from "./Types";

export interface IStopwatch {
  readonly elapsed: number;
  readonly intermediateTimes: IntermediateTime[];
  readonly isNotRunning: boolean;
  readonly isRunning: boolean;
  reset(): void;
  start(text?: string): void;
  stop(text?: string): void;
  takeIntermediateTime(text?: string): void;
}
