import { EventEmitter } from '@engine/core';

export abstract class AbstractVector<V> {
  changed$ = new EventEmitter<{ prop: string, value: number }>();
  dirty = false;

  protected abstract buffer: Float32Array;

  abstract get length(): number;
  abstract set(...args: any): this;
  abstract add(...args: any): this;
  abstract subtract(v: V): this;
  abstract multiply(...args: any): this;
  abstract equals(v: V): boolean;
  abstract dot(v: V): number;
  abstract clone(): V;

  normalize(): this {
    const length = this.length;

    return length ? this.multiply(1 / this.length) : this;
  }

  toArray(): Float32Array {
    return this.buffer;
  }

  isDirty(): boolean {
    return this.dirty;
  }
}
