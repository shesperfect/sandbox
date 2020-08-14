import { AbstractVector } from './vector.abstract';

import { Validate } from '../../validate.decorator';
import { isNumber } from '../../utils';
import { NOT_NUMBER } from '../../constants';

export class Vector2 extends AbstractVector<Vector2> {
  protected buffer = new Float32Array(2);

  constructor(x = 0, y = 0) {
    super();

    this.x = x;
    this.y = y;
  }

  @Validate(isNumber, Error(NOT_NUMBER))
  set x(x: number) { this.buffer[0] = x; }
  get x(): number { return this.buffer[0]; }

  @Validate(isNumber, Error(NOT_NUMBER))
  set y(y: number) { this.buffer[1] = y; }
  get y(): number { return this.buffer[1]; }

  get length(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  set(arg0: number | Vector2, arg1?: number) {
    if (arg0 instanceof Vector2) {
      this.x = arg0.x;
      this.y = arg0.y;
    } else {
      this.x = arg0;
      if (arg1) this.y = arg1;
    }

    return this;
  }

  add(arg0: number | Vector2, arg1 = 0): this {
    if (arg0 instanceof Vector2) {
      this.x += arg0.x;
      this.y += arg0.y;
    } else {
      this.x += arg0;
      this.y += arg1;
    }

    return this;
  }

  subtract(arg0: number | Vector2, arg1 = 0): this {
    if (arg0 instanceof Vector2) {
      this.x -= arg0.x;
      this.y -= arg0.y;
    } else {
      this.x -= arg0;
      this.y -= arg1;
    }

    return this;
  }

  multiply(multiplier: number): this {
    this.x *= multiplier;
    this.y *= multiplier;

    return this;
  }

  equals(v: Vector2): boolean {
    return this.x === v.x && this.y === v.y;
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }
}
