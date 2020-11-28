import { Entity } from '@engine';
import { GeometryBuffer, Vector3 } from '@engine/core';

import { AbstractRenderer } from '../abstract.renderer';

const opts = { stacks: 2, segments: 2 };
const vertices: number[] = [];
const indices: number[] = [];
const normals: number[] = [];

const stackStep = 1 / opts.stacks;
const segmentStep = 1 / opts.segments;

// calculating vertices
for (let i = 0; i <= opts.stacks; i++) {
  for (let j = 0; j <= opts.segments; j++) {
    vertices.push(-.5 + j * segmentStep, .5 - i * stackStep, Math.random() * .2);
  }
}

// calculating normals
for (let i = 0; i < vertices.length - 8; i+= 9) {
  const p1 = new Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
  const p2 = new Vector3(vertices[i + 3], vertices[i + 4], vertices[i + 5]);
  const p3 = new Vector3(vertices[i + 6], vertices[i + 7], vertices[i + 8]);

  const u = p2.subtract(p1);
  const v = p3.subtract(p1);

  const n = u.cross(v);

  normals.push(
    n.x, n.y, n.z,
    n.x, n.y, n.z,
    n.x, n.y, n.z,
  );
}

// calculating indices
for (let i = 0; i < opts.stacks; i++) {
  for (let j = 0; j < opts.segments; j++) {
    indices.push(
      i * (opts.segments + 1) + j,
      i * (opts.segments + 1) + j + 1,
      (i + 1) * (opts.segments + 1) + j,
      i * (opts.segments + 1) + j + 1,
      (i + 1) * (opts.segments + 1) + j,
      (i + 1) * (opts.segments + 1) + j + 1,
    );
  }
}

export class PlaneRenderer extends AbstractRenderer {
  protected buffer = new GeometryBuffer(20, [...vertices, ...normals]);

  private indicesBuffer;

  private ext: ANGLE_instanced_arrays;

  onInit() {
    this.ext = this.renderer.extensions.get('ANGLE_instanced_arrays');

    this.indicesBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), this.gl.STATIC_DRAW);

    // attributes
    const stride = (4 + 16) * Float32Array.BYTES_PER_ELEMENT;

    const pos = this.gl.getAttribLocation(this.shader.program, 'a_position');
    this.gl.vertexAttribPointer(pos, 3, this.gl.FLOAT, false,  0, 0);
    this.gl.enableVertexAttribArray(pos);

    const normal = this.gl.getAttribLocation(this.shader.program, 'a_normal');
    this.gl.vertexAttribPointer(normal, 3, this.gl.FLOAT, false,  0, vertices.length * Float32Array.BYTES_PER_ELEMENT);
    this.gl.enableVertexAttribArray(normal);

    const color = this.gl.getAttribLocation(this.shader.program, 'a_color');
    this.gl.vertexAttribPointer(color, 4, this.gl.FLOAT, false,  stride, (vertices.length + normals.length) * Float32Array.BYTES_PER_ELEMENT);
    this.gl.enableVertexAttribArray(color);
    this.ext.vertexAttribDivisorANGLE(color, 1);

    const model = this.gl.getAttribLocation(this.shader.program, 'a_model');
    this.gl.vertexAttribPointer(model, 4, this.gl.FLOAT, false, stride, (vertices.length + normals.length + 4) * Float32Array.BYTES_PER_ELEMENT);
    this.gl.vertexAttribPointer(model + 1, 4, this.gl.FLOAT, false, stride, (vertices.length + normals.length + 4 + 4) * Float32Array.BYTES_PER_ELEMENT);
    this.gl.vertexAttribPointer(model + 2, 4, this.gl.FLOAT, false, stride, (vertices.length + normals.length + 4 + 8) * Float32Array.BYTES_PER_ELEMENT);
    this.gl.vertexAttribPointer(model + 3, 4, this.gl.FLOAT, false, stride, (vertices.length + normals.length + 4 + 12) * Float32Array.BYTES_PER_ELEMENT);
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
    entity.bufferIndex = this.buffer.add(entity.material.color.toArray());
    this.buffer.add(entity.transform.matrix.toArray());
  }

  onUpdate(entity: Entity) {
    this.buffer.fill([...entity.material.color.toArray(), ...entity.transform.matrix.toArray()], entity.bufferIndex);
  }

  onRemove(entity: Entity) {
    // remove from buffer
  }

  onRender() {
    this.buffer.sync(this.vbo);
    this.ext.drawElementsInstancedANGLE(
      this.gl.TRIANGLES,
      // this.gl.LINES,
      indices.length,
      this.gl.UNSIGNED_BYTE,
      0,
      1,
    );
  }
}
