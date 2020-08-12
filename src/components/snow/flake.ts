import { Geometry } from '@core/geometries';

export class Flake extends Geometry {
  size = 10;
  velocity = .4;

  constructor(x = 0, y = 0) {
    super();

    this.translate(x, y);
    this.scale(this.size, this.size, 1);
  }

  move() {
    // this.
  }
}
