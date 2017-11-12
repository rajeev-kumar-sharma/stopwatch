"use strict";
import { EventEmitter } from 'events';
import { Output } from './output';
export class Stopwatch extends EventEmitter {
    constructor(output) {
        super();
        this._elapsed = 0;
        this._laps = [];
        this._output = Output.String;
        this._running = false;
        this._timer = ['00', '00', '00', '00'];
        if (output) {
            this._output = output;
        }
        this._emitter = new EventEmitter();
    }
    start(cb) {
        if (this._running) {
            throw new Error('The stopwatch is already running!');
        }
        this._running = true;
        this._startTime = Date.now();
        this.register(cb);
        this.measure();
    }
    stop() {
        if (!this._running) {
            throw new Error('You must start the timer first!');
        }
        this._running = false;
    }
    reset() {
        this._running = false;
        this._laps = [];
        this._timer = ['00', '00', '00', '00'];
        this._elapsed = 0;
        this._emitter.removeAllListeners();
    }
    lap() {
        const elapsed = this._elapsed - this._laps.reduce((x, y) => x + y, 0);
        this._laps.push(elapsed);
        return this.output(this.format(elapsed));
    }
    async measure() {
        if (!this._running) {
            return;
        }
        await this.sleep(10);
        this._elapsed = Date.now() - this._startTime;
        this._timer = this.format(this._elapsed);
        this._emitter.emit('running');
        this.measure();
    }
    sleep(ms) {
        return new Promise((res) => setTimeout(res, ms));
    }
    register(cb) {
        this._emitter.on('running', () => {
            cb(this.output(this._timer));
        });
    }
    output(timer) {
        if (this._output === Output.String) {
            return timer.join(':');
        }
        else if (this._output === Output.Array) {
            return timer;
        }
        else {
            throw new Error('Output format not supported!');
        }
    }
    format(elapsed) {
        const msec = parseInt(String(elapsed / 10), 10);
        const sec = parseInt(String(msec / 100), 10);
        const min = parseInt(String(sec / 60), 10);
        const hr = parseInt(String(min / 60), 10);
        return [this.pad(hr), this.pad(min % 60), this.pad(sec % 60), this.pad(msec % 100)];
    }
    pad(n) {
        const str = String(n);
        return new Array(2 - str.length + 1).join('0') + str;
    }
}
