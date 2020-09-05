import { AbstractRenderer } from '@engine';
import { GeometryBuffer } from '@engine/core';

import { BoxGeometry } from './box';

export class BoxRenderer extends AbstractRenderer {
  private buffer = new GeometryBuffer(20, [
    0, 0, 1,
    1, 0, 1,
    0, 1, 1,
    1, 1, 1,
    0, 0, 0,
    1, 0, 0,
    0, 1, 0,
    1, 1, 0,
  ]);

  add(geometry: BoxGeometry) {
    this.buffer.add(geometry.transform.matrix.toArray());
  }

  render() {
    console.log('hui');
  }
}
