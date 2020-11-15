import { Renderable, LineRenderer } from '@engine/renderer';

import { Geometry } from './geometry';

@Renderable(LineRenderer)
export class LineGeometry extends Geometry {
  constructor(vertices: number[] = []) {
    super();

    this._vertices = vertices;
  }
}
