import { println } from "@yobuligo/core.typescript";
import { expect } from "chai";
import { IStopwatch } from "./../src/IStopwatch";
import { createStopwatch, Stopwatch } from "./../src/Stopwatch";

describe("Stopwatch", () => {
  let stopwatch: IStopwatch;

  beforeEach(() => {
    stopwatch = createStopwatch();
  });

  describe("Stopwatch", () => {
    it("creates instance", () => {
      const stopwatch: IStopwatch = Stopwatch;
      expect(stopwatch).not.undefined;
    });

    it("creates singleton instance", () => {
      expect(Stopwatch === Stopwatch).true;
    });
  });

  describe("createStopwatch", () => {
    it("creates instance", () => {
      const stopwatch: IStopwatch = createStopwatch();
      expect(stopwatch).not.undefined;
    });

    it("creates multiple instances", () => {
      expect(createStopwatch() !== createStopwatch()).true;
    });
  });

  describe("elapsed", () => {
    it("returns 0  if the stopwatch wasn't started yet", () => {
      expect(stopwatch.elapsed).equals(0);
    });

    it("returns the elapsed time in milliseconds, since starting the stopwatch, when it wasn't stopped", () => {
      const stopwatch = createStopwatch();
      stopwatch.start();
      setTimeout(() => {
        const first = stopwatch.elapsed;
        println(first);
        expect(first > 0).true;
        // As the stopwatch wasn't stopped the next timestamp must be greater than the current
        setTimeout(() => {
          const second = stopwatch.elapsed;
          expect(second > first).true;
        }, 100);
      }, 100);
    });

    it("returns the difference in milliseconds between starting and stopping the stopwatch", () => {
      const stopwatch = createStopwatch();
      stopwatch.start();
      setTimeout(() => {
        stopwatch.stop();
        const first = stopwatch.elapsed;
        expect(first > 0).true;
        setTimeout(() => {
          const second = stopwatch.elapsed;
          expect(second === first).true;
        }, 100);
      }, 100);
    });
  });

  describe("intermediateTimes", () => {
    it("empty when not started", () => {
      expect(stopwatch.intermediateTimes.length === 0).true;
    });
  });

  describe("isNotRunning", () => {
    it("returns true when not started", () => {
      expect(stopwatch.isNotRunning).true;
    });

    it("returns true when started and stopped", () => {
      stopwatch.start();
      stopwatch.stop();
      expect(stopwatch.isNotRunning).true;
    });

    it("returns true when started and reset", () => {
      stopwatch.start();
      stopwatch.reset();
      expect(stopwatch.isNotRunning).true;
    });

    it("returns false when started", () => {
      stopwatch.start();
      expect(stopwatch.isNotRunning).false;
    });
  });

  describe("isRunning", () => {
    it("returns false when not started", () => {
      expect(stopwatch.isRunning).false;
    });

    it("returns false when started and stopped", () => {
      stopwatch.start();
      stopwatch.stop();
      expect(stopwatch.isRunning).false;
    });

    it("returns false when started and reset", () => {
      stopwatch.start();
      stopwatch.reset();
      expect(stopwatch.isRunning).false;
    });

    it("returns true when started", () => {
      stopwatch.start();
      expect(stopwatch.isRunning).true;
    });
  });

  describe("reset", () => {
    it("reset when not started", () => {
      let throwsError = false;
      try {
        stopwatch.reset();
      } catch (error) {
        throwsError = true;
      }
      expect(throwsError).false;
    });

    it("reset stops stopwatch", () => {
      stopwatch.start();
      stopwatch.reset();
      expect(stopwatch.isRunning).false;
    });

    it("reset clears start time and stop time", () => {
      stopwatch.start();
      stopwatch.stop();
      stopwatch.reset();
      expect(stopwatch.startedAt).undefined;
      expect(stopwatch.stoppedAt).undefined;
    });

    it("reset clears intermediate Times", () => {
      stopwatch.start();
      stopwatch.takeIntermediateTime("test");
      stopwatch.reset();
      expect(stopwatch.intermediateTimes.length === 0).true;
    });
  });

  describe("start", () => {
    it("sets startedAt", () => {
      expect(stopwatch.startedAt).undefined;
      stopwatch.start();
      expect(stopwatch.startedAt).not.undefined;
    });

    it("returns startedAt", () => {
      const startedAt = stopwatch.start();
      expect(startedAt === stopwatch.startedAt).true;
    });

    it("doesn't restart the stopwatch when it was already started", () => {
      stopwatch.start();
      const startedAt = stopwatch.startedAt;
      stopwatch.start();
      expect(startedAt === stopwatch.startedAt).true;
    });

    it("doesn't restart the stopwatch when it was already started and stopped", () => {
      stopwatch.start();
      const startedAt = stopwatch.startedAt;
      stopwatch.stop();
      expect(startedAt === stopwatch.startedAt).true;
    });

    it("restarts after reset", () => {
      stopwatch.start();
      const startedAt = stopwatch.startedAt;
      stopwatch.reset();
      expect(startedAt !== stopwatch.startedAt).true;
    });

    it("adds an intermediate time", () => {
      stopwatch.start();
      expect(stopwatch.intermediateTimes.length === 1).true;
    });

    it("override intermediate time text", () => {
      stopwatch.start("I was started");
      expect(stopwatch.intermediateTimes[0].text === "I was started").true;
    });
  });

  describe("startedAt", () => {
    it("is initial undefined", () => {
      expect(stopwatch.startedAt).undefined;
    });

    it("is set when started", () => {
      stopwatch.start();
      expect(stopwatch.startedAt).not.undefined;
    });
  });

  describe("stop", () => {
    it("sets stoppedAt", () => {
      expect(stopwatch.stoppedAt).undefined;
      stopwatch.start();
      expect(stopwatch.stoppedAt).undefined;
      stopwatch.stop();
      expect(stopwatch.stoppedAt).not.undefined;
    });

    it("returns stoppedAt", () => {
      stopwatch.start();
      const stoppedAt = stopwatch.stop();
      expect(stoppedAt === stopwatch.stoppedAt).true;
    });

    it("returns undefined if not started", () => {
      expect(stopwatch.stop()).undefined;
    });

    it("doesn't stop if the stopwatch is not running", () => {
      stopwatch.stop();
      expect(stopwatch.stoppedAt).undefined;
    });

    it("doesn't stop again if it was already stopped", () => {
      stopwatch.start();
      const stoppedAt = stopwatch.stop();
      expect(stoppedAt === stopwatch.stoppedAt).true;
    });

    it("stops again if it was reset stopped", () => {
      stopwatch.start();
      const stoppedAt = stopwatch.stop();
      stopwatch.reset();
      stopwatch.start();
      expect(stoppedAt !== stopwatch.stoppedAt).true;
    });

    it("adds an intermediate time", () => {
      stopwatch.start();
      stopwatch.stop();
      expect(stopwatch.intermediateTimes.length === 2).true;
    });

    it("overrides intermediate time text", () => {
      stopwatch.start();
      stopwatch.stop("I was stopped");
      expect(stopwatch.intermediateTimes[1].text === "I was stopped").true;
    });
  });

  describe("stoppedAt", () => {
    it("is initial undefined", () => {
      expect(stopwatch.stoppedAt).undefined;
    });

    it("is set when stopped", () => {
      stopwatch.start();
      stopwatch.stop();
      expect(stopwatch.stoppedAt).not.undefined;
    });
  });

  describe("takeIntermediateTime", () => {
    it("not taken if stopwatch was not started", () => {
      stopwatch.takeIntermediateTime("took intermediate time");
      expect(stopwatch.intermediateTimes.length === 0).true;
    });

    it("not taken if stopwatch was stopped", () => {
      stopwatch.start();
      stopwatch.stop();
      stopwatch.takeIntermediateTime("took intermediate time");
      expect(stopwatch.intermediateTimes.length === 2).true;
    });

    it("text and timestamp set when called", () => {
      stopwatch.start();
      stopwatch.takeIntermediateTime("took intermediate time");
      stopwatch.stop();
      expect(stopwatch.intermediateTimes.length === 3).true;
      expect(stopwatch.intermediateTimes[1].text === "took intermediate time")
        .true;
      expect(stopwatch.intermediateTimes[1].timestamp).not.undefined;
    });
  });
});
