import { Geometry } from '@engine';
import { rand, Vector2, Vector3 } from '@engine/core';

const gravity = new Vector3(rand(), 0.003, 0);

export class Flake extends Geometry {
  x = rand(-.5 ,.5, true);
  // x = 0;
  size = rand(10, 30);
  texCoords = new Vector2(rand(0, 15) * 32 / 511, rand(0, 15) * 32 / 511);
  velocity = new Vector3(this.x, 2);
  acceleration = new Vector3();
  dirty = false;
  private initialVelocity: Vector3;

  constructor(private canvasWidth = 0, private canvasHeight = 0) {
    super();

    this.transform.position.set(rand(0, canvasWidth), rand(-100, -10));
    // this.transform.position.set(200, rand(-100, -10));
    this.transform.scale.set(this.size, this.size, 1);

    this.initialVelocity = this.velocity.clone();
  }

  update() {
    // this.velocity.add(this.acceleration);
    this.transform.position.add(this.velocity.clone().add(this.acceleration));
    this.acceleration.set(0 ,0, 0);

    if (this.transform.position.y > this.canvasHeight + this.size) {
      this.clear();
      this.dirty = true;
    }

    if (this.transform.position.x > this.canvasWidth + this.size) {
      this.clear();
    }
  }

  applyGravity() {
    this.applyForce(gravity);
    this.velocity.add(this.acceleration);
  }

  applyObstacle(x: number, y: number, negate = false) {
    negate
      ? this.applyForce(new Vector3(x, y).subtract(this.velocity))
      : this.applyForce(new Vector3(-x, y).subtract(this.velocity));
  }

  private applyForce(force: Vector3) {
    this.acceleration.add(force.clone());
  }

  private clear() {
    this.transform.position.set(rand(0, this.canvasWidth), rand(-100, -10));
    this.velocity = this.initialVelocity.clone();
  }
}
