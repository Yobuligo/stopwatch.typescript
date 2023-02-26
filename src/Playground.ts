import { IStopwatch } from './../dist/IStopwatch.d';
import { println } from "@yobuligo/core.typescript";
import { createStopwatch, Stopwatch } from "./Stopwatch";

const stopwatch: IStopwatch = createStopwatch();

stopwatch.start()
stopwatch.takeIntermediateTime("test");
const intermediateTimes = stopwatch.intermediateTimes
debugger