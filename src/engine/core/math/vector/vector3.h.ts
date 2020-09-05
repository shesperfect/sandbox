import { Vector3 } from './vector3';

export class Vector3H extends Vector3 {
  private readonly initial: Vector3;

  constructor(x = 0, y = 0, z = 0) {
    super(x, y, z);

    this.initial = new Vector3(x, y, z);
  }

  reset() {
    this.set(this.initial)
  }
}
