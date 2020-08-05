import { BaseComponent } from 'common';

import { Scene } from '@core';
import { OrthographicCamera } from '@core/camera';
import { BoxGeometry } from '@core/geometries';
import { Renderer } from '@core/renderer';

import vertexSource from './vertex.glsl';
import fragmentSource from './fragment.glsl';

import './Snow.scss';

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

    const box = new BoxGeometry();
    const scene = new Scene();
    const camera = new OrthographicCamera(100, -400);

    const renderer = new Renderer();
    scene.add(box);

    renderer.render(scene);
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
