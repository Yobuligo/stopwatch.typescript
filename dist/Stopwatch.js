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
            if (this._startedAt !== undefined) {
                if (this._stoppedAt !== undefined) {
                    return this._stoppedAt.getTime() - this._startedAt.getTime();
                }
                else {
                    return new Date().getTime() - this._startedAt.getTime();
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
            return this._startedAt !== undefined && this._stoppedAt === undefined;
        },
        enumerable: false,
        configurable: true
    });
    StopwatchDefault.prototype.reset = function () {
        this._startedAt = undefined;
        this._stoppedAt = undefined;
        this._intermediateTimes = [];
    };
    StopwatchDefault.prototype.start = function (text) {
        var _this = this;
        if (text === void 0) { text = "Start"; }
        (0, core_typescript_1.ifNull)(this._startedAt, function () {
            _this._startedAt = new Date();
            _this.addIntermediateTime(text, _this._startedAt);
        });
        return this._startedAt;
    };
    Object.defineProperty(StopwatchDefault.prototype, "startedAt", {
        get: function () {
            return this._startedAt;
        },
        enumerable: false,
        configurable: true
    });
    StopwatchDefault.prototype.stop = function (text) {
        if (text === void 0) { text = "Stop"; }
        if (this.isRunning) {
            this._stoppedAt = new Date();
            this.addIntermediateTime(text, this._stoppedAt);
        }
        return this._stoppedAt;
    };
    Object.defineProperty(StopwatchDefault.prototype, "stoppedAt", {
        get: function () {
            return this._stoppedAt;
        },
        enumerable: false,
        configurable: true
    });
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