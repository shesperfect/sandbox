import { BaseComponent } from 'common';

import { rand } from '@core';
import { OrthographicCamera } from '@core/camera';

import vertexSource from './vertex.glsl';
import fragmentSource from './fragment.glsl';

import { Flake } from './flake';

import './Snow.scss';

const MAX_COUNT = 10;
const extensions = {
  'ANGLE_instanced_arrays': {},
};

/**
 * https://www.youtube.com/watch?v=cl-mHFCGzYk&t=1427s
 */
export class SnowComponent extends BaseComponent<any, any, OrthographicCamera> {
  snow: Flake[];
  buffer: number[];

  constructor(props: any) {
    const camera = new OrthographicCamera(100, -400);

    super(props, vertexSource, fragmentSource, camera);

    this.snow = [];
    this.buffer = [0, 1, 0, 0, 1, 1, 1, 0];
  }

  protected onRender() {
    if (this.snow.length < MAX_COUNT) {
      const flake = new Flake(rand(0, this.gl.canvas.width), rand(0, this.gl.canvas.height));
      this.snow.push(flake);
      this.buffer = this.buffer.concat(Array.from(flake.transform.matrix.toArray()));
      this.vbo.set(this.gl, new Float32Array(this.buffer));
    }

    (extensions.ANGLE_instanced_arrays as any).drawArraysInstancedANGLE(
      this.gl.TRIANGLE_STRIP,
      0,
      4,
      this.snow.length,
      );
  }

  protected onInit() {
    extensions.ANGLE_instanced_arrays = this.gl.getExtension('ANGLE_instanced_arrays');

    this.gl.clearColor(.14, .14, .14, 1);
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {
    this.camera.right = canvasWidth;
    this.camera.bottom = canvasHeight;
    this.camera.update();

    this.setUniforms();
  }

  protected setAttributes() {
    const pos = this.gl.getAttribLocation(this.program, 'a_position');
    this.gl.vertexAttribPointer(pos, 2, this.gl.FLOAT, false,  0, 0);
    this.gl.enableVertexAttribArray(pos);

    const offset = 32;

    const model = this.gl.getAttribLocation(this.program, 'a_model');
    this.gl.vertexAttribPointer(model, 4, this.gl.FLOAT, false, 64, offset);
    this.gl.vertexAttribPointer(model + 1, 4, this.gl.FLOAT, false, 64, 16 + offset);
    this.gl.vertexAttribPointer(model + 2, 4, this.gl.FLOAT, false, 64, 32 + offset);
    this.gl.vertexAttribPointer(model + 3, 4, this.gl.FLOAT, false, 64, 48 + offset);
    this.gl.enableVertexAttribArray(model);
    this.gl.enableVertexAttribArray(model + 1);
    this.gl.enableVertexAttribArray(model + 2);
    this.gl.enableVertexAttribArray(model + 3);
    (extensions.ANGLE_instanced_arrays as any).vertexAttribDivisorANGLE(model, 1);
    (extensions.ANGLE_instanced_arrays as any).vertexAttribDivisorANGLE(model + 1, 1);
    (extensions.ANGLE_instanced_arrays as any).vertexAttribDivisorANGLE(model + 2, 1);
    (extensions.ANGLE_instanced_arrays as any).vertexAttribDivisorANGLE(model + 3, 1);
  }

  protected setUniforms() {
    const projection = this.gl.getUniformLocation(this.program, 'u_projection');
    this.gl.uniformMatrix4fv(projection, false, this.camera.toArray());
  }
}
