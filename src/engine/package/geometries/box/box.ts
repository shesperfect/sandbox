import { Geometry } from '../geometry';

export class BoxGeometry extends Geometry {
  constructor(width = 100, height = 100, depth = 100) {
    super();

    // this.transform.scale.set(width, height, depth);
  }
}
