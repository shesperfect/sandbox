import { Entity } from '@engine';
import { GeometryBuffer } from '@engine/core';

import { AbstractRenderer } from '../../abstract.renderer';

export class LineRenderer extends AbstractRenderer {
  private geometry = [
    0, -0.5, -1,
    1, -0.5, -1,
    1,  0.5, -1,
    0, -0.5, -1,
    1,  0.5, -1,
    0,  0.5, -1,
    0, 0, 0,
    1, 0, 0,
    0, 0, 1,
  ];
  protected buffer = new GeometryBuffer(23, this.geometry);

  private ext: ANGLE_instanced_arrays;

  onInit() {
    // this.ext = this.renderer.extensions.get('ANGLE_instanced_arrays');
    //
    // // attributes
    // const stride = (3 + 4 + 16) * Float32Array.BYTES_PER_ELEMENT;
    //
    // const pos = this.gl.getAttribLocation(this.shader.program, 'a_position');
    // this.gl.vertexAttribPointer(pos, 3, this.gl.FLOAT, false,  0, 0);
    // this.gl.enableVertexAttribArray(pos);
    //
    // const aLocation = this.gl.getAttribLocation(this.shader.program, 'a_a');
    // this.gl.vertexAttribPointer(aLocation, 3, this.gl.FLOAT, false, 12, geometry.length * Float32Array.BYTES_PER_ELEMENT);
    // this.gl.enableVertexAttribArray(aLocation);
    // ext.vertexAttribDivisorANGLE(aLocation, 1);
    //
    // const bLocation = this.gl.getAttribLocation(this.shader.program, 'a_b');
    // this.gl.vertexAttribPointer(bLocation, 3, this.gl.FLOAT, false, 12, geometry.length * Float32Array.BYTES_PER_ELEMENT + 12);
    // this.gl.enableVertexAttribArray(bLocation);
    // ext.vertexAttribDivisorANGLE(bLocation, 1);
    //
    // const color = this.gl.getAttribLocation(this.shader.program, 'a_color');
    // this.gl.vertexAttribPointer(color, 4, this.gl.FLOAT, false,  stride, (18 + 3) * Float32Array.BYTES_PER_ELEMENT);
    // this.gl.enableVertexAttribArray(color);
    // this.ext.vertexAttribDivisorANGLE(color, 1);
    //
    // const model = this.gl.getAttribLocation(this.shader.program, 'a_model');
    // this.gl.vertexAttribPointer(model, 4, this.gl.FLOAT, false, stride, (18 + 3 + 4) * Float32Array.BYTES_PER_ELEMENT);
    // this.gl.vertexAttribPointer(model + 1, 4, this.gl.FLOAT, false, stride, (18 + 3 + 4 + 4) * Float32Array.BYTES_PER_ELEMENT);
    // this.gl.vertexAttribPointer(model + 2, 4, this.gl.FLOAT, false, stride, (18 + 3 + 4 + 8) * Float32Array.BYTES_PER_ELEMENT);
    // this.gl.vertexAttribPointer(model + 3, 4, this.gl.FLOAT, false, stride, (18 + 3 + 4 + 12) * Float32Array.BYTES_PER_ELEMENT);
    // this.gl.enableVertexAttribArray(model);
    // this.gl.enableVertexAttribArray(model + 1);
    // this.gl.enableVertexAttribArray(model + 2);
    // this.gl.enableVertexAttribArray(model + 3);
    // this.ext.vertexAttribDivisorANGLE(model, 1);
    // this.ext.vertexAttribDivisorANGLE(model + 1, 1);
    // this.ext.vertexAttribDivisorANGLE(model + 2, 1);
    // this.ext.vertexAttribDivisorANGLE(model + 3, 1);
    //
    // // uniforms
    // const projection = this.gl.getUniformLocation(this.shader.program, 'u_projection');
    //
    // this.gl.uniformMatrix4fv(projection, false, this.camera.matrix.toArray());
    //
    // this.camera.transform.position.changed$.subscribe(() => {
    //   this.gl.uniformMatrix4fv(projection, false, this.camera.matrix.toArray());
    // });
  }

  onAdd(entity: Entity) {
    entity.bufferIndex = this.buffer.add(entity.geometry.vertices);
    this.buffer.add(entity.material.color.toArray());
    this.buffer.add(entity.transform.matrix.toArray());
  }

  onUpdate(entity: Entity) {
    // this.buffer.fill([...entity.material.color.toArray(), ...entity.transform.matrix.toArray()], entity.bufferIndex);
  }

  onRemove(entity: Entity) {
    // remove from buffer
  }

  onRender() {
    this.buffer.sync(this.vbo);
    this.ext.drawArraysInstancedANGLE(
      this.gl.TRIANGLES,
      0,
      2,
      1,
    );
  }
}
