"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stopwatch = exports.createStopwatch = void 0;
var core_typescript_1 = require("@yobuligo/core.typescript");
var StopwatchDefault = /** @class */ (function () {
    function StopwatchDefault() {
        this._intermediateTimes = [];
    }
    Object.defineProperty(StopwatchDefault.prototype, "elapsed", {
        get: function () {
            if (this.startTime !== undefined) {
                if (this.endTime !== undefined) {
                    return this.endTime.getTime() - this.startTime.getTime();
                }
                else {
                    return new Date().getTime() - this.startTime.getTime();
                }
            }
            else {
                return 0;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StopwatchDefault.prototype, "intermediateTimes", {
        get: function () {
            return this._intermediateTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StopwatchDefault.prototype, "isNotRunning", {
        get: function () {
            return !this.isRunning;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StopwatchDefault.prototype, "isRunning", {
        get: function () {
            return this.startTime !== undefined && this.endTime === undefined;
        },
        enumerable: false,
        configurable: true
    });
    StopwatchDefault.prototype.reset = function () {
        this.startTime = undefined;
        this.endTime = undefined;
        this._intermediateTimes = [];
    };
    StopwatchDefault.prototype.start = function (text) {
        var _this = this;
        if (text === void 0) { text = "Start"; }
        (0, core_typescript_1.ifNull)(this.startTime, function () {
            _this.startTime = new Date();
            _this.addIntermediateTime(text, _this.startTime);
        });
    };
    StopwatchDefault.prototype.stop = function (text) {
        if (text === void 0) { text = "Stop"; }
        if (this.isRunning) {
            this.endTime = new Date();
            this.addIntermediateTime(text, this.endTime);
        }
    };
    StopwatchDefault.prototype.takeIntermediateTime = function (text) {
        if (text === void 0) { text = "Intermediate time"; }
        if (this.isRunning) {
            this.addIntermediateTime(text, new Date());
        }
    };
    StopwatchDefault.prototype.addIntermediateTime = function (text, timestamp) {
        this.intermediateTimes.push({ text: text, timestamp: timestamp });
    };
    return StopwatchDefault;
}());
var createStopwatch = function () {
    return new StopwatchDefault();
};
exports.createStopwatch = createStopwatch;
exports.Stopwatch = (0, exports.createStopwatch)();
//# sourceMappingURL=Stopwatch.js.map