import { BaseComponent } from 'common';

import { OrthographicCamera } from '@core/camera';

import vertexSource from './vertex.glsl';
import fragmentSource from './fragment.glsl';

import './Snow.scss';
import { ParticleSystem } from '@core/geometries';

const extensions = {
  'ANGLE_instanced_arrays': {},
};

export class SnowComponent extends BaseComponent<any, any, OrthographicCamera> {
  constructor(props: any) {
    const camera = new OrthographicCamera(100, -400);

    super(props, vertexSource, fragmentSource, camera);
  }

  protected onRender() {
    (extensions.ANGLE_instanced_arrays as any).drawArraysInstancedANGLE(this.gl.TRIANGLE_STRIP, 0, 4, 20);
  }

  protected onInit() {
    extensions.ANGLE_instanced_arrays = this.gl.getExtension('ANGLE_instanced_arrays');

    this.vbo.set(this.gl, new Float32Array([0, 100, 100, 100, 0, 0, 100, 0]));

    this.gl.clearColor(1, 1, 1, 1);

    const ps = new ParticleSystem();
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
  }

  protected setUniforms() {
    const projection = this.gl.getUniformLocation(this.program, 'u_projection');
    this.gl.uniformMatrix4fv(projection, false, this.camera.toArray());
  }
}
