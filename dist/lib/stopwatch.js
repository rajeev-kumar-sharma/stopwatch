"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var output_1 = require("./output");
var Stopwatch = (function (_super) {
    __extends(Stopwatch, _super);
    function Stopwatch(output) {
        var _this = _super.call(this) || this;
        _this._elapsed = 0;
        _this._laps = [];
        _this._output = output_1.Output.String;
        _this._running = false;
        _this._timer = ['00', '00', '00', '00'];
        if (output) {
            _this._output = output;
        }
        _this._emitter = new events_1.EventEmitter();
        return _this;
    }
    Stopwatch.prototype.start = function (cb) {
        if (this._running) {
            throw new Error('The stopwatch is already running!');
        }
        this._running = true;
        this._startTime = Date.now();
        this.register(cb);
        this.measure();
    };
    Stopwatch.prototype.stop = function () {
        if (!this._running) {
            throw new Error('You must start the timer first!');
        }
        this._running = false;
    };
    Stopwatch.prototype.reset = function () {
        this._running = false;
        this._laps = [];
        this._timer = ['00', '00', '00', '00'];
        this._elapsed = 0;
        this._emitter.removeAllListeners();
    };
    Stopwatch.prototype.lap = function () {
        var elapsed = this._elapsed - this._laps.reduce(function (x, y) { return x + y; }, 0);
        this._laps.push(elapsed);
        return this.output(this.format(elapsed));
    };
    Stopwatch.prototype.measure = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._running) {
                            return [2];
                        }
                        return [4, this.sleep(10)];
                    case 1:
                        _a.sent();
                        this._elapsed = Date.now() - this._startTime;
                        this._timer = this.format(this._elapsed);
                        this._emitter.emit('running');
                        this.measure();
                        return [2];
                }
            });
        });
    };
    Stopwatch.prototype.sleep = function (ms) {
        return new Promise(function (res) { return setTimeout(res, ms); });
    };
    Stopwatch.prototype.register = function (cb) {
        var _this = this;
        this._emitter.on('running', function () {
            cb(_this.output(_this._timer));
        });
    };
    Stopwatch.prototype.output = function (timer) {
        if (this._output === output_1.Output.String) {
            return timer.join(':');
        }
        else if (this._output === output_1.Output.Array) {
            return timer;
        }
        else {
            throw new Error('Output format not supported!');
        }
    };
    Stopwatch.prototype.format = function (elapsed) {
        var msec = parseInt(String(elapsed / 10), 10);
        var sec = parseInt(String(msec / 100), 10);
        var min = parseInt(String(sec / 60), 10);
        var hr = parseInt(String(min / 60), 10);
        return [this.pad(hr), this.pad(min % 60), this.pad(sec % 60), this.pad(msec % 100)];
    };
    Stopwatch.prototype.pad = function (n) {
        var str = String(n);
        return new Array(2 - str.length + 1).join('0') + str;
    };
    return Stopwatch;
}(events_1.EventEmitter));
exports.Stopwatch = Stopwatch;
