import { Renderable, BoxRenderer } from '@engine/renderer';

import { Geometry } from './geometry';

@Renderable(BoxRenderer)
export class BoxGeometry extends Geometry {
  constructor(width = 1, height = 1, depth = 1) {
    super();

    this.transform.scale.set(width, height, depth);
  }
}