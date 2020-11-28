import { PlaneRenderer, Renderable } from '@engine/renderer';

import { Geometry, GeometryOptions } from './geometry';

export interface PlaneGeometryOptions extends GeometryOptions {
  stacks?: number;
  segments?: number;
}

const defaultOptions = {
  stacks: 1,
  segments: 1,
};

@Renderable(PlaneRenderer)
export class PlaneGeometry extends Geometry {


  constructor(options:  PlaneGeometryOptions) {
    super();
  }
}
