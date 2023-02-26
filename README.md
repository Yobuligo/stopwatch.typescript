# stopwatch.typescript
An implementation of a stopwatch for TypeScript.

## Installation
Install the library via:

```
npm install --save @yobuligo/stopwatch.typescript
```

## Usage
To use the stopwatch an instance of IStopwatch has to be created, which can be started, stopped and used in different classes and functions to add interim timestamps.

### Create instance by createStopwatch
Method `createStopwatch` can be used to create multiple instances of the stopwatch.

### Use singleton instance Stopwatch
The constants `Stopwatch` is a singleton instance which can be easily accessed at various code passages.

### elapsed
Returns the difference in milliseconds between starting and stopping the stopwatch.

Returns the elapsed time in milliseconds, since starting the stopwatch, when it wasn't stopped.

Returns 0 if the stopwatch wasn't started yet.
```
const stopwatch = createStopwatch();
stopwatch.start();
stopwatch.stop();
// ...
stopwatch.elapsed;
```

### intermediateTimes
Returns a list of intermediate times. An intermediate time is a pair of text and timestamp. These timestamps can be created via method _takeIntermediateTime()_.

### isNotRunning
Returns _true_ if the stopwatch wasn't started or if it was stopped after starting it or if it was reset. Otherwise it returns _false_.
```
const stopwatch = createStopwatch();
if (stopwatch.isNotRunning) {
    // ...
}
```

### isRunning
Returns _true_ if the stopwatch was started but not stopped and not reset.
```
const stopwatch = createStopwatch();
if (stopwatch.isRunning) {
    // ...
}
```

### reset
Resets the start time, stop time and taken intermediate times.
```
const stopwatch = createStopwatch();
stopwatch.start();
stopwatch.stop();
stopwatch.reset();
```

### start
Starts the stopwatch, returns the timestamp and adds an intermediate time. The corresponding intermediate time text can be specified by passing in parameter _text_.

The method call has no effect if the stopwatch was already started, not even after it was stopped. To restart it call method _reset()_ first.
```
const stopwatch = createStopwatch();
const startedAt = stopwatch.start();
```

### startedAt
Returns the timestamp of the start time or null if not started.
```
const stopwatch = createStopwatch();
stopwatch.start();
// ...
stopwatch.startedAt?.getTime();
```

### stop
Stops the stopwatch, returns the timestamp if stopped and adds an intermediate time. The corresponding intermediate time text can be specified by passing in parameter _text_.

The method call has no effect, if the stopwatch is not running.
```
const stopwatch = createStopwatch();
stopwatch.start();
const stoppedAt = stopwatch.stop();
```

### stoppedAt
Returns the timestamp of the stop time of null if not started.
```
const stopwatch = createStopwatch();
stopwatch.start();
// ...
stopwatch.stop();
// ...
stopwatch.stoppedAt?.getTime();
```

### takeIntermediateTime
Takes a current timestamp, combined with a _text_ and adds it to a list of intermediate times. These timestamps can be retrieved via property _intermediateTimes_.

The method call has no effect, if the stopwatch is not running.
```
const stopwatch = createStopwatch();
stopwatch.start();
// ...
stopwatch.takeIntermediateTime("Calculation started");
// ...
stopwatch.takeIntermediateTime("Calculation completed");
// ...
stopwatch.stop();

console.log(stopwatch.elapsed);
```