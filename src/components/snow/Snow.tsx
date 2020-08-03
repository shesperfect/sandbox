import { BaseComponent } from 'common';

import { OrthographicCamera } from '@core/camera';

import vertexSource from 'common/shaders/base.vert';
import fragmentSource from 'common/shaders/base.frag';

import './Snow.scss';

export class SnowComponent extends BaseComponent<any, any, WebGLRenderingContext> {
  constructor(props: any) {
    const camera = new OrthographicCamera(0, 594, 500, 0, 100, -400);

    super(props, vertexSource, fragmentSource, camera);
  }

  protected onRender() {
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 3)
  }

  protected onInit() {
    this.vbo.set(this.gl, new Float32Array([50, 50, 1, 50, 100, 1, 100, 100, 1]));

    this.gl.clearColor(1, 1, 1, 1);
  }

  protected setAttributes(program: WebGLProgram) {
    const pos = this.gl.getAttribLocation(program, 'a_position');
    this.gl.vertexAttribPointer(pos, 3, this.gl.FLOAT, false,  0, 0);
    this.gl.enableVertexAttribArray(pos);
  }
}
