/// <reference types="node" />
import { EventEmitter } from 'events';
import { Output } from './output';
export declare class Stopwatch extends EventEmitter {
    private _emitter;
    private _elapsed;
    private _laps;
    private _output;
    private _running;
    private _startTime;
    private _timer;
    constructor(output?: Output);
    start(cb: (data: string | string[]) => void): void;
    stop(): void;
    reset(): void;
    lap(): string | string[];
    private measure();
    private sleep(ms);
    private register(cb);
    private output(timer);
    private format(elapsed);
    private pad(n);
}
