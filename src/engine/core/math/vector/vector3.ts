import { Validate, isNumber, NOT_NUMBER } from '@engine/core';

import { AbstractVector } from './vector.abstract';

export class Vector3 extends AbstractVector<Vector3> {
  protected buffer = new Float32Array(3);

  constructor(x = 0, y = 0, z = 0) {
    super();

    this.x = x;
    this.y = y;
    this.z = z;
  }

  @Validate(isNumber, Error(NOT_NUMBER))
  set x(x: number) { this.buffer[0] = x; }
  get x(): number { return this.buffer[0]; }

  @Validate(isNumber, Error(NOT_NUMBER))
  set y(y: number) { this.buffer[1] = y; }
  get y(): number { return this.buffer[1]; }

  @Validate(isNumber, Error(NOT_NUMBER))
  set z(z: number) { this.buffer[2] = z; }
  get z(): number { return this.buffer[2]; }

  get length(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
  }

  set(arg0: number | Vector3, arg1 = 0, arg2 = 0) {
    if (arg0 instanceof Vector3) {
      this.x = arg0.x;
      this.y = arg0.y;
      this.z = arg0.z;
    } else {
      this.x = arg0;
      this.y = arg1;
      this.z = arg2;
    }

    this.dirty = true;

    return this;
  }

  add(arg0: number | Vector3, arg1 = 0, arg2 = 0): this {
    if (arg0 instanceof Vector3) {
      this.x += arg0.x;
      this.y += arg0.y;
      this.z += arg0.z;
    } else {
      this.x += arg0;
      this.y += arg1;
      this.z += arg2;
    }

    this.dirty = true;

    return this;
  }

  subtract(arg0: number | Vector3, arg1 = 0, arg2 = 0): this {
    if (arg0 instanceof Vector3) {
      this.x -= arg0.x;
      this.y -= arg0.y;
      this.z -= arg0.z;
    } else {
      this.x -= arg0;
      this.y -= arg1;
      this.z -= arg2;
    }

    this.dirty = true;

    return this;
  }

  multiply(multiplier: number): this {
    this.x *= multiplier;
    this.y *= multiplier;
    this.z *= multiplier;

    return this;
  }

  equals(v: Vector3): boolean {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }

  clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }
}
