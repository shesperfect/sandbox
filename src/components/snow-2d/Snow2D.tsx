import { BasicMaterial, BoxGeometry, Entity, Scene } from '@engine';

import { BaseComponent } from 'common';

import './Snow.scss';

/**
 * https://www.youtube.com/watch?v=cl-mHFCGzYk&t=1427s
 */
export class Snow2DComponent extends BaseComponent<any, any> {
  protected onRender() {
    this.setUniforms();
  }

  protected onInit() {
    const cube = new Entity(new BoxGeometry(), new BasicMaterial());

    this.app.scenes.current.add(cube);

    // const { width, height } = this.app.canvas;
    //
    // const camera = new PerspectiveCamera(45, width / height, 1, 2000);
    // camera.transform.position.set(0, 0, 5);
    // camera.lookAt();
    //
    // const orbitControls = new OrbitControls(this.app.canvas, camera, { keyboard: true, speed: .3 });
    // const scene = new Scene();
    // scene.add(new Entity(new BoxGeometry(), new BasicMaterial()));
    //
    // this.gl = this.app.context;
    // this.ext = this.app.extensions.get('ANGLE_instanced_arrays');
    //
    // this.gl.viewport(0, 0, width, height);
    // this.gl.clearColor(.4, .4, .4, 1);
    // this.gl.enable(this.gl.DEPTH_TEST);
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {
    // camera.right = canvasWidth;
    // camera.bottom = canvasHeight;
    // camera.update();

    this.setUniforms();
  }

  protected setAttributes() {
      // const stride = (3 + 3 + 3 + 16) * Float32Array.BYTES_PER_ELEMENT;
      //
      // const pos = this.gl.getAttribLocation(this.program, 'a_position');
      // this.gl.vertexAttribPointer(pos, 3, this.gl.FLOAT, false,  stride, 0);
      // this.gl.enableVertexAttribArray(pos);
      //
      // const color = this.gl.getAttribLocation(this.program, 'a_color');
      // this.gl.vertexAttribPointer(color, 3, this.gl.FLOAT, false,  stride, 3 * Float32Array.BYTES_PER_ELEMENT);
      // this.gl.enableVertexAttribArray(color);
      //
      // const normal = this.gl.getAttribLocation(this.program, 'a_normal');
      // this.gl.vertexAttribPointer(normal, 3, this.gl.FLOAT, false,  stride, (3 + 3) * Float32Array.BYTES_PER_ELEMENT);
      // this.gl.enableVertexAttribArray(normal);
      //
      // const model = this.gl.getAttribLocation(this.program, 'a_model');
      // this.gl.vertexAttribPointer(model, 4, this.gl.FLOAT, false, stride, (3 + 3 + 3) * Float32Array.BYTES_PER_ELEMENT);
      // this.gl.vertexAttribPointer(model + 1, 4, this.gl.FLOAT, false, stride, (3 + 3 + 3 + 4) * Float32Array.BYTES_PER_ELEMENT);
      // this.gl.vertexAttribPointer(model + 2, 4, this.gl.FLOAT, false, stride, (3 + 3 + 3 + 8) * Float32Array.BYTES_PER_ELEMENT);
      // this.gl.vertexAttribPointer(model + 3, 4, this.gl.FLOAT, false, stride, (3 + 3 + 3 + 12) * Float32Array.BYTES_PER_ELEMENT);
      // this.gl.enableVertexAttribArray(model);
      // this.gl.enableVertexAttribArray(model + 1);
      // this.gl.enableVertexAttribArray(model + 2);
      // this.gl.enableVertexAttribArray(model + 3);
  }

  protected setUniforms() {
    // const projection = this.gl.getUniformLocation(this.program, 'u_projection');
    //
    // this.gl.uniformMatrix4fv(projection, false, camera.matrix.toArray());
  }
}
