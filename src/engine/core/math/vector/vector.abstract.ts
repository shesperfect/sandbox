export abstract class AbstractVector<V> {
  dirty = false;

  protected abstract buffer: Float32Array;

  abstract get length(): number;
  abstract set(...args: any): this;
  abstract add(...args: any): this;
  abstract subtract(...args: any): this;
  abstract multiply(...args: any): this;
  abstract equals(...args: any): boolean;
  abstract clone(): V;

  normalize(): this {
    const length = this.length;

    return length ? this.multiply(1 / this.length) : this;
  }

  toArray(): Float32Array {
    return this.buffer;
  }
}
