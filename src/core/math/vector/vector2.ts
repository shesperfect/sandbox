import { AbstractVector } from './vector.abstract';

import { Validate } from '../../validate.decorator';
import { isNumber } from '../../utils';
import { NOT_NUMBER } from '../../constants';

export class Vector2 extends AbstractVector {
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
}
