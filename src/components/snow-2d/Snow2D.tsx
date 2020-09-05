import {
  Scene,
  OrthographicCamera,
  Clock,
  ParticleSystem,
  BoxGeometry, BasicMaterial
} from '@engine';

import { BaseComponent } from 'common';

import vertexSource from './vertex.glsl';
import fragmentSource from './fragment.glsl';

import flakesTextureSrc from './assets/flakes.png';

import './Snow.scss';

const camera = new OrthographicCamera(0, 100, 0, 100);
const scene = new Scene();
const particles = new ParticleSystem<BoxGeometry, BasicMaterial>();
const clock = new Clock();

// const gui = {
//   obstacle: new Vector3(200, 200, 40),
//   intensity: 1,
// };


/**
 * https://www.youtube.com/watch?v=cl-mHFCGzYk&t=1427s
 */
export class Snow2DComponent extends BaseComponent<any, any> {
  constructor(props: any) {
    super(props, vertexSource, fragmentSource);
  }

  protected onRender() {
    // if (particles.count < 10) {
    //   particles.add(new BoxGeometry());
    //   clock.reset();
    // }
    //
    // let arr = this.buffer;
    // for (let flake of this.snow) {
    //   const flakeX = flake.transform.position.x + flake.size / 2;
    //   const flakeY = flake.transform.position.y + flake.size / 2;
    //   const pointerX = pointer.x + pointer.z;
    //   const pointerY = pointer.y + pointer.z;
    //   const pointerR = pointer.z;
    //   const flakeR = flake.size / 2;
    //
    //   const d = Math.sqrt(Math.pow(pointerX - flakeX, 2) + Math.pow(pointerY - flakeY, 2));
    //
    //   if (d <= pointerR + flakeR) {
    //     const x = 1;
    //     const y = Math.abs(flakeY - (pointerY - Math.sqrt(Math.abs(d * d - Math.pow(pointerX - flakeX - x, 2)))));
    //
    //     flake.applyObstacle(x, Math.max(y, 0), flakeX > pointerX);
    //   }
    //
    //   flake.applyGravity();
    //   flake.update();
    //   flake.dirty && (adding = false);
    //   arr = arr.concat([flake.texCoords.x, flake.texCoords.y]).concat(Array.from(flake.transform.matrix.toArray()));
    // }
    //
    // this.vbo.set(this.gl, new Float32Array(arr));
    // this.ext.drawArraysInstancedANGLE(
    //   this.gl.TRIANGLE_STRIP,
    //   0,
    //   4,
    //   this.snow.length,
    // );

    this.app.render(camera, scene);
    camera.update();
  }

  protected onInit() {
    const gl = this.app.context;
    const { width, height } = this.app.canvas;

    gl.viewport(0, 0, width, height);
    gl.clearColor(.14, .14, .14, 1);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {
    camera.right = canvasWidth;
    camera.bottom = canvasHeight;
    camera.update();

    this.setUniforms();
  }

  protected setAttributes() {
    const gl = this.app.context;
    const ext = this.app.extensions.get('ANGLE_instanced_arrays');
    const offset = 32;
    const stride = 72;

    const pos = gl.getAttribLocation(this.program, 'a_position');
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false,  0, 0);
    gl.enableVertexAttribArray(pos);

    const tex = gl.getAttribLocation(this.program, 'a_texcoord');
    gl.vertexAttribPointer(tex, 2, gl.FLOAT, false, stride, offset);
    gl.enableVertexAttribArray(tex);
    ext.vertexAttribDivisorANGLE(tex, 1);

    const model = gl.getAttribLocation(this.program, 'a_model');
    gl.vertexAttribPointer(model, 4, gl.FLOAT, false, stride, offset + 8);
    gl.vertexAttribPointer(model + 1, 4, gl.FLOAT, false, stride, offset + 16 + 8);
    gl.vertexAttribPointer(model + 2, 4, gl.FLOAT, false, stride, offset + 32 + 8);
    gl.vertexAttribPointer(model + 3, 4, gl.FLOAT, false, stride, offset + 48 + 8);
    gl.enableVertexAttribArray(model);
    gl.enableVertexAttribArray(model + 1);
    gl.enableVertexAttribArray(model + 2);
    gl.enableVertexAttribArray(model + 3);
    ext.vertexAttribDivisorANGLE(model, 1);
    ext.vertexAttribDivisorANGLE(model + 1, 1);
    ext.vertexAttribDivisorANGLE(model + 2, 1);
    ext.vertexAttribDivisorANGLE(model + 3, 1);
  }

  protected setUniforms() {
    const gl = this.app.context;
    const projection = gl.getUniformLocation(this.program, 'u_projection');

    gl.uniformMatrix4fv(projection, false, camera.toArray());

    this.loadTexture();
  }

  private loadTexture() {
    const gl = this.app.context;
    const texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0,
      gl.RGBA,
      gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

    const image = new Image();
    image.src = flakesTextureSrc;
    image.addEventListener('load', (i) => {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
      gl.generateMipmap(gl.TEXTURE_2D);

      const texLoc = gl.getUniformLocation(this.program, "u_spriteTexture");
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(texLoc, 0);
    });
  }
}
