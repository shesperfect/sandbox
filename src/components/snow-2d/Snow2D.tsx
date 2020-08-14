import { Vector3 } from '@core';

import { BaseComponent } from 'common';

import { OrthographicCamera } from '@core/camera';

import vertexSource from './vertex.glsl';
import fragmentSource from './fragment.glsl';

import { Flake } from './flake';

import flakesTextureSrc from './assets/flakes.png';

import './Snow.scss';

const pointer = new Vector3(200, 200, 40);
const intensity = 1;

let elapsed = 0;
let currentTime = performance.now();

const extensions = {
  'ANGLE_instanced_arrays': {},
};

let adding = true;

/**
 * https://www.youtube.com/watch?v=cl-mHFCGzYk&t=1427s
 */
export class Snow2DComponent extends BaseComponent<any, any, OrthographicCamera> {
  snow: Flake[];
  buffer: number[];

  constructor(props: any) {
    const camera = new OrthographicCamera(100, -400);

    super(props, vertexSource, fragmentSource, camera);

    this.snow = [];
    this.buffer = [0, 1, 0, 0, 1, 1, 1, 0];
  }

  protected onRender() {
    const now = performance.now();
    elapsed += now - currentTime;
    currentTime = now;

    if (adding && elapsed >= 1000 * (1 - intensity)) {
      const flake = new Flake(this.gl.canvas.width, this.gl.canvas.height);
      // flake.dirty = true;
      this.snow.push(flake);
      elapsed = 0;
    }

    let arr = this.buffer;
    for (let flake of this.snow) {
      const flakeX = flake.transform.position.x + flake.size / 2;
      const flakeY = flake.transform.position.y + flake.size / 2;
      const pointerX = pointer.x + pointer.z;
      const pointerY = pointer.y + pointer.z;
      const pointerR = pointer.z;
      const flakeR = flake.size / 2;

      const d = Math.sqrt(Math.pow(pointerX - flakeX, 2) + Math.pow(pointerY - flakeY, 2));

      if (d <= pointerR + flakeR) {
        const x = 1;
        const y = Math.abs(flakeY - (pointerY - Math.sqrt(Math.abs(d * d - Math.pow(pointerX - flakeX - x, 2)))));

        console.log(x, y);

        flake.applyObstacle(x, Math.max(y, 0), flakeX > pointerX);
      }

      flake.applyGravity();
      flake.update();
      flake.dirty && (adding = false);
      arr = arr.concat([flake.texCoords.x, flake.texCoords.y]).concat(Array.from(flake.transform.matrix.toArray()));
    }

    this.vbo.set(this.gl, new Float32Array(arr));
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
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.ONE, this.gl.ONE);

    // const obstacle = document.getElementById('obstacle');
    // obstacle && this.gl.canvas.addEventListener('mousemove', e => {
    //   pointer.x = e.offsetX - pointer.z;
    //   pointer.y = e.offsetY - pointer.z;
    //   obstacle.style.top = `${pointer.y}px`;
    //   obstacle.style.left = `${pointer.x}px`;
    // });
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {
    this.camera.right = canvasWidth;
    this.camera.bottom = canvasHeight;
    this.camera.update();

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
    (extensions.ANGLE_instanced_arrays as any).vertexAttribDivisorANGLE(tex, 1);

    const model = this.gl.getAttribLocation(this.program, 'a_model');
    this.gl.vertexAttribPointer(model, 4, this.gl.FLOAT, false, stride, offset + 8);
    this.gl.vertexAttribPointer(model + 1, 4, this.gl.FLOAT, false, stride, offset + 16 + 8);
    this.gl.vertexAttribPointer(model + 2, 4, this.gl.FLOAT, false, stride, offset + 32 + 8);
    this.gl.vertexAttribPointer(model + 3, 4, this.gl.FLOAT, false, stride, offset + 48 + 8);
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

    this.loadTexture();
  }

  private loadTexture() {
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

      // this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      // this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
      // this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      // this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.generateMipmap(this.gl.TEXTURE_2D);

      const texLoc = this.gl.getUniformLocation(this.program, "u_spriteTexture");
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.uniform1i(texLoc, 0);
    });
  }
}
