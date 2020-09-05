import { Vector2 } from './vector2';

export class Vector2H extends Vector2 {
  private readonly initial: Vector2;

  constructor(x = 0, y = 0) {
    super(x, y);

    this.initial = new Vector2(x, y);
  }

  reset() {
    this.set(this.initial)
  }
}
