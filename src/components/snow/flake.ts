import { Vector2 } from '@core';
import { Geometry } from '@core/geometries';

export class Flake extends Geometry {
  size = 10;
  position = new Vector2();
  velocity = new Vector2(.2, .4);

  constructor(x = 0, y = 0) {
    super();


    this.transform.position.set(x, y);
    this.transform.scale.set(this.size, this.size, 1);
  }

  update() {

  }
}
