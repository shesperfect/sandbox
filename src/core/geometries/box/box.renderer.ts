import { AbstractRenderer } from '@core/renderer';
import { GeometryBuffer } from '@core/buffer';

import { BoxGeometry } from './box';

export class BoxRenderer extends AbstractRenderer {
  private buffer = new GeometryBuffer(20, [0, 0, 1, 0, 0, 1, 1, 1]);

  add(geometry: BoxGeometry) {
    this.buffer.add(geometry.transform.matrix.toArray());
  }

  render() {
    console.log('hui');
  }
}
