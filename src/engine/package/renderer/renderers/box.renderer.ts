import { Entity } from '@engine';
import { GeometryBuffer } from '@engine/core';

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
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,

    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,

    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
  ];
  protected buffer = new GeometryBuffer(19, this.vertices);

  private ext: ANGLE_instanced_arrays;

  onInit() {
    this.ext = this.renderer.extensions.get('ANGLE_instanced_arrays');

    // attributes
    const stride = (3 + 16) * Float32Array.BYTES_PER_ELEMENT;

    const pos = this.gl.getAttribLocation(this.shader.program, 'a_position');
    this.gl.vertexAttribPointer(pos, 3, this.gl.FLOAT, false,  0, 0);
    this.gl.enableVertexAttribArray(pos);

    // const normal = this.gl.getAttribLocation(this.shader.program, 'a_normal');
    // this.gl.vertexAttribPointer(normal, 3, this.gl.FLOAT, false,  0, 108 * Float32Array.BYTES_PER_ELEMENT);
    // this.gl.enableVertexAttribArray(normal);

    const color = this.gl.getAttribLocation(this.shader.program, 'a_color');
    this.gl.vertexAttribPointer(color, 3, this.gl.FLOAT, false,  stride, 108 * Float32Array.BYTES_PER_ELEMENT);
    this.gl.enableVertexAttribArray(color);
    this.ext.vertexAttribDivisorANGLE(color, 1);

    const model = this.gl.getAttribLocation(this.shader.program, 'a_model');
    this.gl.vertexAttribPointer(model, 4, this.gl.FLOAT, false, stride, (108 + 3) * Float32Array.BYTES_PER_ELEMENT);
    this.gl.vertexAttribPointer(model + 1, 4, this.gl.FLOAT, false, stride, (108 + 3 + 4) * Float32Array.BYTES_PER_ELEMENT);
    this.gl.vertexAttribPointer(model + 2, 4, this.gl.FLOAT, false, stride, (108 + 3 + 8) * Float32Array.BYTES_PER_ELEMENT);
    this.gl.vertexAttribPointer(model + 3, 4, this.gl.FLOAT, false, stride, (108 + 3 + 12) * Float32Array.BYTES_PER_ELEMENT);
    this.gl.enableVertexAttribArray(model);
    this.gl.enableVertexAttribArray(model + 1);
    this.gl.enableVertexAttribArray(model + 2);
    this.gl.enableVertexAttribArray(model + 3);
    this.ext.vertexAttribDivisorANGLE(model, 1);
    this.ext.vertexAttribDivisorANGLE(model + 1, 1);
    this.ext.vertexAttribDivisorANGLE(model + 2, 1);
    this.ext.vertexAttribDivisorANGLE(model + 3, 1);

    // uniforms
    const projection = this.gl.getUniformLocation(this.shader.program, 'u_projection');

    this.gl.uniformMatrix4fv(projection, false, this.camera.matrix.toArray());

    this.camera.transform.position.changed$.subscribe(() => {
      this.gl.uniformMatrix4fv(projection, false, this.camera.matrix.toArray());
    });
  }

  onAdd(entity: Entity) {
    this.buffer.add(entity.material.color.rgb.toArray());
    this.buffer.add(entity.transform.matrix.toArray());
  }

  onRemove(entity: Entity) {
    // remove from buffer
  }

  onRender() {
    this.buffer.sync(this.vbo);
    this.ext.drawArraysInstancedANGLE(
      this.gl.TRIANGLES,
      0,
      36,
      1,
    );
  }
}
