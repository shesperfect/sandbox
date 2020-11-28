import { Renderable, BoxRenderer } from '@engine/renderer';

import { Geometry, GeometryOptions } from './geometry';

export interface BoxGeometryOptions extends GeometryOptions {}

@Renderable(BoxRenderer)
export class BoxGeometry extends Geometry {
  constructor(options?: BoxGeometryOptions) {
    super();
  }
}
