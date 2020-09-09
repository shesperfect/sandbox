import { rand, Vector3, Vector3H } from '@engine/core';

import { Entity } from '../entity';

export class Particle extends Entity {
  velocity = new Vector3H();
  acceleration = new Vector3();

  applyForce(force: Vector3) {
    this.acceleration.add(force.clone());

    return this;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.transform.position.add(this.velocity.clone().add(this.acceleration));
    this.acceleration.set(0 ,0, 0);

    // if (this.transform.position.y > this.canvasHeight + this.size) {
    //   this.clear();
    //   this.dirty = true;
    // }
    //
    // if (this.transform.position.x > this.canvasWidth + this.size) {
    //   this.clear();
    // }
  }

  reset() {
    this.transform.position.set(rand(0, 400), rand(-100, -10));
    this.velocity.reset();
  }
}
