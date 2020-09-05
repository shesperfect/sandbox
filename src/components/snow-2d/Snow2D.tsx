import {
  Scene,
  OrthographicCamera,
  Clock,
  ParticleSystem,
  BoxGeometry, BasicMaterial
} from '@engine';
import { rand, Vector3 } from '@engine/core';

import { BaseComponent } from 'common';

import vertexSource from './vertex.glsl';
import fragmentSource from './fragment.glsl';

import flakesTextureSrc from './assets/flakes.png';

import './Snow.scss';

const camera = new OrthographicCamera(0, 100, 0, 100);
const scene = new Scene();
const particles = new ParticleSystem<BoxGeometry, BasicMaterial>();
const clock = new Clock();
const gravity = new Vector3(rand(), 0.003, 0);

// const gui = {
//   obstacle: new Vector3(200, 200, 40),
//   intensity: 1,
// };


/**
 * https://www.youtube.com/watch?v=cl-mHFCGzYk&t=1427s
 */
export class Snow2DComponent extends BaseComponent<any, any> {
  gl: WebGLRenderingContext;
  ext: ANGLE_instanced_arrays;

  constructor(props: any) {
    super(props, vertexSource, fragmentSource);
  }

  protected onRender() {
    if (particles.count < 10) {
      particles.add(new BoxGeometry());
      clock.reset();
    }

    for (let flake of particles) {
      // const flakeX = flake.transform.position.x + flake.size / 2;
      // const flakeY = flake.transform.position.y + flake.size / 2;
      // const pointerX = pointer.x + pointer.z;
      // const pointerY = pointer.y + pointer.z;
      // const pointerR = pointer.z;
      // const flakeR = flake.size / 2;
      //
      // const d = Math.sqrt(Math.pow(pointerX - flakeX, 2) + Math.pow(pointerY - flakeY, 2));
      //
      // if (d <= pointerR + flakeR) {
      //   const x = 1;
      //   const y = Math.abs(flakeY - (pointerY - Math.sqrt(Math.abs(d * d - Math.pow(pointerX - flakeX - x, 2)))));
      //
      //   flake.applyObstacle(x, Math.max(y, 0), flakeX > pointerX);
      // }

      flake.applyForce(gravity);
      flake.update();
      // flake.dirty && (adding = false);
      // arr = arr.concat([flake.texCoords.x, flake.texCoords.y]).concat(Array.from(flake.transform.matrix.toArray()));
    }

    // this.vbo.set(this.gl, new Float32Array(arr));
    this.ext.drawArraysInstancedANGLE(
      this.gl.TRIANGLE_STRIP,
      0,
      4,
      particles.count,
    );

    this.app.render(camera, scene);
    camera.update();
  }

  protected onInit() {
    const { width, height } = this.app.canvas;

    this.gl = this.app.context;
    this.ext = this.app.extensions.get('ANGLE_instanced_arrays');

    this.gl.viewport(0, 0, width, height);
    this.gl.clearColor(.14, .14, .14, 1);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.ONE, this.gl.ONE);

    scene.add(particles);
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {
    camera.right = canvasWidth;
    camera.bottom = canvasHeight;
    camera.update();

    this.setUniforms();
  }

  protected setAttributes() {
    const offset = 32;
    const stride = 72;

    const pos = this.gl.getAttribLocation(this.program, 'a_position');
    this.gl.vertexAttribPointer(pos, 2, this.gl.FLOAT, false,  0, 0);
    this.gl.enableVertexAttribArray(pos);

    const tex = this.gl.getAttribLocation(this.program, 'a_texcoord');
    this.gl.vertexAttribPointer(tex, 2, this.gl.FLOAT, false, stride, offset);
    this.gl.enableVertexAttribArray(tex);
    this.ext.vertexAttribDivisorANGLE(tex, 1);

    const model = this.gl.getAttribLocation(this.program, 'a_model');
    this.gl.vertexAttribPointer(model, 4, this.gl.FLOAT, false, stride, offset + 8);
    this.gl.vertexAttribPointer(model + 1, 4, this.gl.FLOAT, false, stride, offset + 16 + 8);
    this.gl.vertexAttribPointer(model + 2, 4, this.gl.FLOAT, false, stride, offset + 32 + 8);
    this.gl.vertexAttribPointer(model + 3, 4, this.gl.FLOAT, false, stride, offset + 48 + 8);
    this.gl.enableVertexAttribArray(model);
    this.gl.enableVertexAttribArray(model + 1);
    this.gl.enableVertexAttribArray(model + 2);
    this.gl.enableVertexAttribArray(model + 3);
    this.ext.vertexAttribDivisorANGLE(model, 1);
    this.ext.vertexAttribDivisorANGLE(model + 1, 1);
    this.ext.vertexAttribDivisorANGLE(model + 2, 1);
    this.ext.vertexAttribDivisorANGLE(model + 3, 1);
  }

  protected setUniforms() {
    const projection = this.gl.getUniformLocation(this.program, 'u_projection');

    this.gl.uniformMatrix4fv(projection, false, camera.toArray());

    this.loadTexture();
  }

  private loadTexture() {
    const gl = this.app.context;
    const texture = this.gl.createTexture();

    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

    const image = new Image();
    image.src = flakesTextureSrc;
    image.addEventListener('load', (i) => {
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA,this.gl.UNSIGNED_BYTE, image);
      this.gl.generateMipmap(this.gl.TEXTURE_2D);

      const texLoc = this.gl.getUniformLocation(this.program, "u_spriteTexture");
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.uniform1i(texLoc, 0);
    });
  }
}
