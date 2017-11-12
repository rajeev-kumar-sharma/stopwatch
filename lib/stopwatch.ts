import { EventEmitter } from 'events';
import { Output } from './output';

/**
 * @class
 * @name Stopwatch
 * @public
 * @description A Stopwatch for JavaScript.
 */
export class Stopwatch extends EventEmitter {
  private _emitter: EventEmitter;
  private _elapsed: number = 0;
  private _laps: number[] = [];
  private _output: Output = Output.String;
  private _running: boolean = false;
  private _startTime: number;
  private _timer: string[] = ['00', '00', '00', '00'];

  constructor (output?: Output) {
    super();
    if (output) {
      this._output = output;
    }
    this._emitter = new EventEmitter();
  }

  /**
   * @function
   * @name start
   * @public
   * @throws The stopwatch is already running!
   * @description Starts the timer.
   */
  public start (cb: (data: string | string[]) => void): void {
    if (this._running) {
      throw new Error('The stopwatch is already running!');
    }
    this._running = true;
    this._startTime = Date.now();
    this.register(cb);
    this.measure();
  }

  /**
   * @function
   * @name stop
   * @public
   * @throws You must start the timer first!
   * @description Stops the timer.
   */
  public stop (): void {
    if (!this._running) {
      throw new Error('You must start the timer first!');
    }
    this._running = false;
  }

  /**
   * @function
   * @name reset
   * @public
   * @description Resets the timer.
   */
  public reset (): void {
    this._running = false;
    this._laps = [];
    this._timer = ['00', '00', '00', '00'];
    this._elapsed = 0;
    this._emitter.removeAllListeners();
  }

  /**
   * @function
   * @name lap
   * @public
   * @description Captures timer laps.
   */
  public lap (): string | string[] {
    const elapsed = this._elapsed - this._laps.reduce((x, y) => x + y, 0);
    this._laps.push(elapsed);

    return this.output(this.format(elapsed));
  }

  /**
   * @function
   * @name measure
   * @private
   * @description Runs timer.
   */
  private async measure () {
    if (!this._running) {
      return;
    }
    await this.sleep(10);
    this._elapsed = Date.now() - this._startTime;
    this._timer = this.format(this._elapsed);
    this._emitter.emit('running');
    this.measure();
  }

  /**
   * @function
   * @name sleep
   * @private
   * @description Sleeps for given time.
   * @returns Promise
   */
  private sleep (ms: number): Promise<number> {
    return new Promise((res) => setTimeout(res, ms));
  }

  /**
   * @function
   * @name register
   * @private
   * @param cb
   * @description Registers event for timer.
   */
  private register (cb: (data: string | string[]) => void): void {
    this._emitter.on('running', () => {
      cb(this.output(this._timer));
    });
  }

  /**
   * @function
   * @name output
   * @private
   * @returns Formated timer.
   * @description Output current timer.
   */
  private output (timer: string[]): string | string[] {
    if (this._output === Output.String) {
      return timer.join(':');
    } else if (this._output === Output.Array) {
      return timer;
    } else {
      throw new Error('Output format not supported!');
    }
  }

  /**
   * @function
   * @name format
   * @private
   * @description Format elapsed timer.
   */
  private format (elapsed: number): string[] {
    const msec = parseInt(String(elapsed / 10), 10);
    const sec = parseInt(String(msec / 100), 10);
    const min = parseInt(String(sec / 60), 10);
    const hr = parseInt(String(min / 60), 10);

    return [this.pad(hr), this.pad(min % 60), this.pad(sec % 60), this.pad(msec % 100)];
  }

  private pad (n: number): string {
    const str = String(n);

    return new Array(2 - str.length + 1).join('0') + str;
  }
}
