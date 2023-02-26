import { IntermediateTime } from "./Types";
/**
 * An implementation of this interface represents a stopwatch instance.
 */
export interface IStopwatch {
    /**
     * Returns the difference in milliseconds between starting and stopping the stopwatch.
     *
     * Returns the elapsed time in milliseconds, since starting the stopwatch, when it wasn't stopped.
     *
     * Returns 0 if the stopwatch wasn't started yet.
     */
    readonly elapsed: number;
    /**
     * Returns a list of intermediate times. An intermediate time is a pair of text and timestamp. These timestamps can be created via method *{@link takeIntermediateTime}()*.
     */
    readonly intermediateTimes: IntermediateTime[];
    /**
     * Returns *true* if the stopwatch wasn't started or if it was stopped after starting it or if it was reset. Otherwise it returns *false*.
     */
    readonly isNotRunning: boolean;
    /**
     * Returns *true* if the stopwatch was started but not stopped and not reset.
     */
    readonly isRunning: boolean;
    /**
     * Resets the start time, stop time and taken intermediate times.
     */
    reset(): void;
    /**
     * Starts the stopwatch and adds an intermediate time. The corresponding intermediate time text can be specified by passing in parameter *{@link text}*.
     *
     * The method call has no effect if the stopwatch was already started, not even after it was stopped. To restart it call method *{@link reset}()* first.
     */
    start(text?: string): void;
    /**
     * Stops the stopwatch and adds an intermediate time. The corresponding intermediate time text can be specified by passing in parameter *{@link text}*.
     *
     * The method call has no effect, if the stopwatch is not running.
     */
    stop(text?: string): void;
    /**
     * Takes a current timestamp, combined with a *{@link text}* and adds it to a list of intermediate times. These timestamps can be retrieved via property *{@link intermediateTimes}*.
     *
     * The method call has no effect, if the stopwatch is not running.
     */
    takeIntermediateTime(text?: string): void;
}
