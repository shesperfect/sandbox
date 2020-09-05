import { CLOCK_NOT_RUNNING } from '@engine/core';

export class Clock {
  private _elapsedTime = 0;
  private isRunning: boolean;

  constructor(autoStart = true) {
    this.isRunning = autoStart;
  }

  get elapsedTime(): number {
    if (!this.isRunning) console.warn(CLOCK_NOT_RUNNING);

    return this._elapsedTime + this._delta;
  }

  get delta(): number {
    if (!this.isRunning) console.warn(CLOCK_NOT_RUNNING);

    return this._delta;
  }

  start() {
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }

  reset() {
    this._elapsedTime = 0;
  }

  private get now(): number {
    return this.isRunning ? performance.now() : this._elapsedTime;
  }

  private get _delta(): number {
    return this.now - this._elapsedTime;
  }
}
