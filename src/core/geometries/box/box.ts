import { Renderable } from '@core/renderer';

import { BoxRenderer } from './box.renderer';

import { Geometry } from '../geometry';

@Renderable(BoxRenderer)
export class BoxGeometry extends Geometry {
  constructor(width = 100, height = 100, depth = 1) {
    super();

    this.transform.scale.set(width, height, depth);
  }
}