import { Renderable } from '@core/renderer';
import { BoxRenderer } from '@core/geometries';

import { Geometry } from '../geometry';

@Renderable(BoxRenderer)
export class BoxGeometry extends Geometry {
  constructor(width = 100, height = 100, depth = 1) {
    super();

    this.scale(width, height, depth);
  }
}
