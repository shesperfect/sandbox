import {
  // Scene,
  OrthographicCamera, // Clock, ParticleSystem,
  BoxGeometry, BasicMaterial, Entity, PerspectiveCamera
} from '@engine';
// import { rand, Vector3 } from '@engine/core';

import { BaseComponent } from 'common';

import vertexSource from './vertex.glsl';
import fragmentSource from './fragment.glsl';

// import flakesTextureSrc from './assets/flakes.png';

import './Snow.scss';

// const camera = new OrthographicCamera(400, -400);
let camera;
// const scene = new Scene();
// const particles = new ParticleSystem(new BoxGeometry(), new BasicMaterial());
// const clock = new Clock();
// const gravity = new Vector3(rand(), 0.003, 0);

const cube = new Entity(new BoxGeometry(), new BasicMaterial());
cube.transform.scale.multiply(100);
cube.transform.position.add(200, 200);
cube.transform.position.x = -150;
cube.transform.position.z = -860;
console.log(cube.transform.matrix.toArray());
const delta = .1 * Math.PI / 180;

/**
 * https://www.youtube.com/watch?v=cl-mHFCGzYk&t=1427s
 */
export class Snow2DComponent extends BaseComponent<any, any> {
  gl: WebGLRenderingContext;
  ext: ANGLE_instanced_arrays;

  vertices = [
    // front
    1.0, 1.0, 1.0,    0.95, 0.43, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    1.0, -1.0, 1.0,   0.95, 0.43, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    -1.0, -1.0, 1.0,  0.95, 0.43, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    -1.0, 1.0, 1.0,   0.95, 0.43, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    // back
    1.0, 1.0, -1.0,    0.95, 0.53, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    1.0, -1.0, -1.0,   0.95, 0.53, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    -1.0, -1.0, -1.0,  0.95, 0.53, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    -1.0, 1.0, -1.0,   0.95, 0.53, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    // top
    -1.0, 1.0, -1.0,   0.95, 0.13, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    -1.0, 1.0, 1.0,    0.95, 0.13, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    1.0, 1.0, 1.0,     0.95, 0.13, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    1.0, 1.0, -1.0,    0.95, 0.13, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    // left
    -1.0, 1.0, 1.0,    0.95, 0.23, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    -1.0, -1.0, 1.0,   0.95, 0.23, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    -1.0, -1.0, -1.0,  0.95, 0.23, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    -1.0, 1.0, -1.0,   0.95, 0.23, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    // right
    1.0, 1.0, 1.0,    0.95, 0.33, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    1.0, -1.0, 1.0,   0.95, 0.33, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    1.0, -1.0, -1.0,  0.95, 0.33, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    1.0, 1.0, -1.0,   0.95, 0.33, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    // bottom
    -1.0, -1.0, -1.0,  0.95, 0.63, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    -1.0, -1.0, 1.0,   0.95, 0.63, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    1.0, -1.0, 1.0,    0.95, 0.63, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    1.0, -1.0, -1.0,   0.95, 0.63, 0.13, ...Array.from(cube.transform.matrix.toArray()),
  ];
  indices = [
    // top
    0, 1, 2,
    0, 2, 3,
    // left
    5, 4, 6,
    6, 4, 7,
    // right
    8, 9, 10,
    8, 10, 11,
    // front
    13, 12, 14,
    15, 14, 12,
    // back
    16, 17, 18,
    16, 18, 19,
    // bottom
    21, 20, 22,
    22, 20, 23
  ];

  constructor(props: any) {
    super(props, vertexSource, fragmentSource);
  }

  protected onRender() {
    cube.transform.rotation.x += delta;
    cube.transform.rotation.y += delta;
    cube.transform.rotation.z += delta;

    const vertices = [
      // front
      1.0, 1.0, 1.0,    0.95, 0.43, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      1.0, -1.0, 1.0,   0.95, 0.43, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      -1.0, -1.0, 1.0,  0.95, 0.43, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      -1.0, 1.0, 1.0,   0.95, 0.43, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      // back
      1.0, 1.0, -1.0,    0.95, 0.53, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      1.0, -1.0, -1.0,   0.95, 0.53, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      -1.0, -1.0, -1.0,  0.95, 0.53, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      -1.0, 1.0, -1.0,   0.95, 0.53, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      // top
      -1.0, 1.0, -1.0,   0.95, 0.13, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      -1.0, 1.0, 1.0,    0.95, 0.13, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      1.0, 1.0, 1.0,     0.95, 0.13, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      1.0, 1.0, -1.0,    0.95, 0.13, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      // left
      -1.0, 1.0, 1.0,    0.95, 0.23, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      -1.0, -1.0, 1.0,   0.95, 0.23, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      -1.0, -1.0, -1.0,  0.95, 0.23, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      -1.0, 1.0, -1.0,   0.95, 0.23, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      // right
      1.0, 1.0, 1.0,    0.95, 0.33, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      1.0, -1.0, 1.0,   0.95, 0.33, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      1.0, -1.0, -1.0,  0.95, 0.33, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      1.0, 1.0, -1.0,   0.95, 0.33, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      // bottom
      -1.0, -1.0, -1.0,  0.95, 0.63, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      -1.0, -1.0, 1.0,   0.95, 0.63, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      1.0, -1.0, 1.0,    0.95, 0.63, 0.13, ...Array.from(cube.transform.matrix.toArray()),
      1.0, -1.0, -1.0,   0.95, 0.63, 0.13, ...Array.from(cube.transform.matrix.toArray()),
    ];

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.vbo.set(this.gl, new Float32Array(vertices));

    // this.gl.drawElements(this.gl.TRIANGLES, 2, this.gl.UNSIGNED_SHORT, 0);
    // this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    // this.ext.drawArraysInstancedANGLE(this.gl.TRIANGLE_STRIP, 0, 4, 1);
    this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
    // this.ext.drawElementsInstancedANGLE(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0, 1);
  }

  protected onInit() {
    const { width, height } = this.app.canvas;
    camera = new PerspectiveCamera(45, width / height, 1, -200);
    console.log(camera.toArray());

    this.gl = this.app.context;
    this.ext = this.app.extensions.get('ANGLE_instanced_arrays');

    this.gl.viewport(0, 0, width, height);
    this.gl.clearColor(.14, .14, .14, 1);
    this.gl.enable(this.gl.DEPTH_TEST);
    // this.gl.enable(this.gl.CULL_FACE);
    // this.gl.frontFace(this.gl.CCW);
    // this.gl.cullFace(this.gl.BACK);

    const boxIndexBufferObject = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);

    // document.addEventListener('keydown', e => {
    //   switch(e.key) {
    //     case 'ArrowLeft':
    //       cube.transform.rotation.y -= delta;
    //       console.log('left', cube.transform.matrix.toArray());
    //       break;
    //     case 'ArrowRight':
    //       cube.transform.rotation.y += delta;
    //       // console.log('right', cube.transform.matrix.toArray());
    //       break;
    //     case 'ArrowUp':
    //       cube.transform.rotation.x -= delta;
    //       // console.log('top', cube.transform.matrix.toArray());
    //       break;
    //     case 'ArrowDown':
    //       cube.transform.rotation.x += delta;
    //       // console.log('bottom', cube.transform.matrix.toArray());
    //       break;
    //   }
    // });
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {
    camera.right = canvasWidth;
    camera.bottom = canvasHeight;
    camera.update();

    this.setUniforms();
  }

  protected setAttributes() {
      const stride = (3 + 3 + 16) * Float32Array.BYTES_PER_ELEMENT;

      const pos = this.gl.getAttribLocation(this.program, 'a_position');
      this.gl.vertexAttribPointer(pos, 3, this.gl.FLOAT, false,  stride, 0);
      this.gl.enableVertexAttribArray(pos);

      const color = this.gl.getAttribLocation(this.program, 'a_color');
      this.gl.vertexAttribPointer(color, 3, this.gl.FLOAT, false,  stride, 3 * Float32Array.BYTES_PER_ELEMENT);
      this.gl.enableVertexAttribArray(color);

      const model = this.gl.getAttribLocation(this.program, 'a_model');
      this.gl.vertexAttribPointer(model, 4, this.gl.FLOAT, false, stride, (3 + 3) * Float32Array.BYTES_PER_ELEMENT);
      this.gl.vertexAttribPointer(model + 1, 4, this.gl.FLOAT, false, stride, (3 + 3 + 4) * Float32Array.BYTES_PER_ELEMENT);
      this.gl.vertexAttribPointer(model + 2, 4, this.gl.FLOAT, false, stride, (3 + 3 + 8) * Float32Array.BYTES_PER_ELEMENT);
      this.gl.vertexAttribPointer(model + 3, 4, this.gl.FLOAT, false, stride, (3 + 3 + 12) * Float32Array.BYTES_PER_ELEMENT);
      this.gl.enableVertexAttribArray(model);
      this.gl.enableVertexAttribArray(model + 1);
      this.gl.enableVertexAttribArray(model + 2);
      this.gl.enableVertexAttribArray(model + 3);
  }

  protected setUniforms() {
    const projection = this.gl.getUniformLocation(this.program, 'u_projection');

    this.gl.uniformMatrix4fv(projection, false, camera.toArray());
  }

  // protected onRender() {
  //   if (particles.count < 10) {
  //     particles.create();
  //
  //     clock.reset();
  //   }
  //
  //   for (let flake of particles) {
  //     flake.applyForce(gravity).update();
  //   }
  //
  //   this.app.render(camera, scene);
  //   camera.update();
  // }
  //
  // protected onInit() {
  //   const { width, height } = this.app.canvas;
  //
  //   this.gl = this.app.context;
  //   this.ext = this.app.extensions.get('ANGLE_instanced_arrays');
  //
  //   this.gl.viewport(0, 0, width, height);
  //   this.gl.clearColor(.14, .14, .14, 1);
  //   this.gl.enable(this.gl.BLEND);
  //   this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
  //
  //   scene.add(particles);
  // }
  //
  // protected onResize(canvasWidth: number, canvasHeight: number) {
  //   camera.right = canvasWidth;
  //   camera.bottom = canvasHeight;
  //   camera.update();
  //
  //   this.setUniforms();
  // }
  //
  // protected setAttributes() {
  //   const offset = 32;
  //   const stride = 72;
  //
  //   const pos = this.gl.getAttribLocation(this.program, 'a_position');
  //   this.gl.vertexAttribPointer(pos, 2, this.gl.FLOAT, false,  0, 0);
  //   this.gl.enableVertexAttribArray(pos);
  //
  //   const tex = this.gl.getAttribLocation(this.program, 'a_texcoord');
  //   this.gl.vertexAttribPointer(tex, 2, this.gl.FLOAT, false, stride, offset);
  //   this.gl.enableVertexAttribArray(tex);
  //   this.ext.vertexAttribDivisorANGLE(tex, 1);
  //
  //   const model = this.gl.getAttribLocation(this.program, 'a_model');
  //   this.gl.vertexAttribPointer(model, 4, this.gl.FLOAT, false, stride, offset + 8);
  //   this.gl.vertexAttribPointer(model + 1, 4, this.gl.FLOAT, false, stride, offset + 16 + 8);
  //   this.gl.vertexAttribPointer(model + 2, 4, this.gl.FLOAT, false, stride, offset + 32 + 8);
  //   this.gl.vertexAttribPointer(model + 3, 4, this.gl.FLOAT, false, stride, offset + 48 + 8);
  //   this.gl.enableVertexAttribArray(model);
  //   this.gl.enableVertexAttribArray(model + 1);
  //   this.gl.enableVertexAttribArray(model + 2);
  //   this.gl.enableVertexAttribArray(model + 3);
  //   this.ext.vertexAttribDivisorANGLE(model, 1);
  //   this.ext.vertexAttribDivisorANGLE(model + 1, 1);
  //   this.ext.vertexAttribDivisorANGLE(model + 2, 1);
  //   this.ext.vertexAttribDivisorANGLE(model + 3, 1);
  // }
  //
  // protected setUniforms() {
  //   const projection = this.gl.getUniformLocation(this.program, 'u_projection');
  //
  //   this.gl.uniformMatrix4fv(projection, false, camera.toArray());
  //
  //   this.loadTexture();
  // }
  //
  // private loadTexture() {
  //   const texture = this.gl.createTexture();
  //
  //   this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
  //   this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0,
  //     this.gl.RGBA,
  //     this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
  //
  //   const image = new Image();
  //   image.src = flakesTextureSrc;
  //   image.addEventListener('load', (i) => {
  //     this.gl.activeTexture(this.gl.TEXTURE0);
  //     this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
  //     this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA,this.gl.UNSIGNED_BYTE, image);
  //     this.gl.generateMipmap(this.gl.TEXTURE_2D);
  //
  //     const texLoc = this.gl.getUniformLocation(this.program, "u_spriteTexture");
  //     this.gl.activeTexture(this.gl.TEXTURE0);
  //     this.gl.uniform1i(texLoc, 0);
  //   });
  // }
}
