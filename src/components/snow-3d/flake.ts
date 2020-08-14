import { rand, Vector3 } from '@core';
import { Geometry } from '@core/geometries';

export class Flake extends Geometry {
  x = rand(-.5 ,.5, true);
  size = rand(3, 10);
  position = new Vector3();
  velocity = new Vector3(this.x, 2);
  acceleration = new Vector3();
  dirty = false;

  constructor(private canvasWidth = 0, private canvasHeight = 0) {
    super();

    this.transform.position.set(rand(0, canvasWidth), rand(-100, -10));
    this.transform.scale.set(this.size, this.size, 1);
  }

  applyForce(force: Vector3) {
    this.acceleration.add(force.clone().multiply(this.size * .2));
  }

  update() {
    this.velocity.add(this.acceleration);
    this.transform.position.add(this.velocity);
    this.acceleration.set(0 ,0, 0);

    if (this.transform.position.y > this.canvasHeight + this.size) {
      this.transform.position.y = -this.size;
      this.velocity.set(this.x, 2, 0);
      this.dirty = true;
    }

    if (this.transform.position.x > this.canvasWidth + this.size) {
      this.transform.position.x = -this.size;
      this.velocity.set(this.x, 2, 0);
    }
  }
}
