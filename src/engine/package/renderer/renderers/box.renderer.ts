import { Entity } from '@engine';
import { ENTITY_ALREADY_EXISTS, ENTITY_DOESNT_EXIST, GeometryBuffer } from '@engine/core';

import { AbstractRenderer } from '../abstract.renderer';

export class BoxRenderer extends AbstractRenderer {
  protected vertices: number[] = [
    -0.5, -0.5,  -0.5,
    -0.5,  0.5,  -0.5,
    0.5, -0.5,  -0.5,
    -0.5,  0.5,  -0.5,
    0.5,  0.5,  -0.5,
    0.5, -0.5,  -0.5,

    -0.5, -0.5,   0.5,
    0.5, -0.5,   0.5,
    -0.5,  0.5,   0.5,
    -0.5,  0.5,   0.5,
    0.5, -0.5,   0.5,
    0.5,  0.5,   0.5,

    -0.5,   0.5, -0.5,
    -0.5,   0.5,  0.5,
    0.5,   0.5, -0.5,
    -0.5,   0.5,  0.5,
    0.5,   0.5,  0.5,
    0.5,   0.5, -0.5,

    -0.5,  -0.5, -0.5,
    0.5,  -0.5, -0.5,
    -0.5,  -0.5,  0.5,
    -0.5,  -0.5,  0.5,
    0.5,  -0.5, -0.5,
    0.5,  -0.5,  0.5,

    -0.5,  -0.5, -0.5,
    -0.5,  -0.5,  0.5,
    -0.5,   0.5, -0.5,
    -0.5,  -0.5,  0.5,
    -0.5,   0.5,  0.5,
    -0.5,   0.5, -0.5,

    0.5,  -0.5, -0.5,
    0.5,   0.5, -0.5,
    0.5,  -0.5,  0.5,
    0.5,  -0.5,  0.5,
    0.5,   0.5, -0.5,
    0.5,   0.5,  0.5,
  ];
  protected normals: number[] = [
    0, 0, -1,
    0, 0, 1,
    0, 1, 0,
    0, -1, 0,
    -1, 0, 0,
    1, 0, 0,
  ];
  protected buffer = new GeometryBuffer(36, [...this.vertices, ...this.normals]);

  add(entity: Entity) {
    if (this.entities.has(entity)) throw new Error(ENTITY_ALREADY_EXISTS);

    this.entities.add(entity);
  }

  remove(entity: Entity) {
    if (!this.entities.has(entity)) throw new Error(ENTITY_DOESNT_EXIST);

    this.entities.delete(entity);
  }

  onRender() {
    this.buffer.sync(this.vbo);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 36);
  }
}
