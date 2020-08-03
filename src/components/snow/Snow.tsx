import { BaseComponent } from 'common';

import { OrthographicCamera } from '@core/camera';

import vertexSource from 'common/shaders/base.vert';
import fragmentSource from 'common/shaders/base.frag';

import './Snow.scss';

export class SnowComponent extends BaseComponent<any, any, WebGLRenderingContext> {
  constructor(props: any) {
    const camera = new OrthographicCamera(100, -400);

    super(props, vertexSource, fragmentSource, camera);
  }

  protected onRender() {
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 3)
  }

  protected onInit() {
    this.vbo.set(this.gl, new Float32Array([150, 150, 1, 50, 100, 1, 100, 100, 1]));

    this.gl.clearColor(1, 1, 1, 1);
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {
    (this.camera as OrthographicCamera).right = canvasWidth;
    (this.camera as OrthographicCamera).bottom = canvasHeight;
    this.camera.update();

    this.setUniforms();
  }

  protected setAttributes() {
    const pos = this.gl.getAttribLocation(this.program, 'a_position');
    this.gl.vertexAttribPointer(pos, 3, this.gl.FLOAT, false,  0, 0);
    this.gl.enableVertexAttribArray(pos);
  }

  protected setUniforms() {
    const projection = (this.gl as any).getUniformLocation(this.program, 'u_projection');
    (this.gl as any).uniformMatrix4fv(projection, false, this.camera.toArray());
  }
}
