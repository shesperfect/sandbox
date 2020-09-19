import {
  BoxGeometry, BasicMaterial, Entity, PerspectiveCamera, OrbitControls,
} from '@engine';

import { BaseComponent } from 'common';

import vertexSource from './vertex.glsl';
import fragmentSource from './fragment.glsl';

import './Snow.scss';

let camera, orbitControls;
const cube = new Entity(new BoxGeometry(), new BasicMaterial());

const cubeColor = [0.1, 0.1, 0.1];

// const delta = 15 * Math.PI / 180;

/**
 * https://www.youtube.com/watch?v=cl-mHFCGzYk&t=1427s
 */
export class Snow2DComponent extends BaseComponent<any, any> {
  gl: WebGLRenderingContext;
  ext: ANGLE_instanced_arrays;

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
    this.setUniforms();

    const cubeVertices = [
      // front
      1.0, 1.0, 1.0,    ...cubeColor, ...[0, 0, 1], ...Array.from(cube.transform.matrix.toArray()),
      1.0, -1.0, 1.0,   ...cubeColor, ...[0, 0, 1], ...Array.from(cube.transform.matrix.toArray()),
      -1.0, -1.0, 1.0,  ...cubeColor, ...[0, 0, 1], ...Array.from(cube.transform.matrix.toArray()),
      -1.0, 1.0, 1.0,   ...cubeColor, ...[0, 0, 1], ...Array.from(cube.transform.matrix.toArray()),
      // back
      1.0, 1.0, -1.0,    ...cubeColor, ...[0, 0, -1], ...Array.from(cube.transform.matrix.toArray()),
      1.0, -1.0, -1.0,   ...cubeColor, ...[0, 0, -1], ...Array.from(cube.transform.matrix.toArray()),
      -1.0, -1.0, -1.0,  ...cubeColor, ...[0, 0, -1], ...Array.from(cube.transform.matrix.toArray()),
      -1.0, 1.0, -1.0,   ...cubeColor, ...[0, 0, -1], ...Array.from(cube.transform.matrix.toArray()),
      // top
      -1.0, 1.0, -1.0,   ...cubeColor, ...[0, 1, 0], ...Array.from(cube.transform.matrix.toArray()),
      -1.0, 1.0, 1.0,    ...cubeColor, ...[0, 1, 0], ...Array.from(cube.transform.matrix.toArray()),
      1.0, 1.0, 1.0,     ...cubeColor, ...[0, 1, 0], ...Array.from(cube.transform.matrix.toArray()),
      1.0, 1.0, -1.0,    ...cubeColor, ...[0, 1, 0], ...Array.from(cube.transform.matrix.toArray()),
      // left
      -1.0, 1.0, 1.0,    ...cubeColor, ...[-1, 0, 0], ...Array.from(cube.transform.matrix.toArray()),
      -1.0, -1.0, 1.0,   ...cubeColor, ...[-1, 0, 0], ...Array.from(cube.transform.matrix.toArray()),
      -1.0, -1.0, -1.0,  ...cubeColor, ...[-1, 0, 0], ...Array.from(cube.transform.matrix.toArray()),
      -1.0, 1.0, -1.0,   ...cubeColor, ...[-1, 0, 0], ...Array.from(cube.transform.matrix.toArray()),
      // right
      1.0, 1.0, 1.0,    ...cubeColor, ...[1, 0, 0], ...Array.from(cube.transform.matrix.toArray()),
      1.0, -1.0, 1.0,   ...cubeColor, ...[1, 0, 0], ...Array.from(cube.transform.matrix.toArray()),
      1.0, -1.0, -1.0,  ...cubeColor, ...[1, 0, 0], ...Array.from(cube.transform.matrix.toArray()),
      1.0, 1.0, -1.0,   ...cubeColor, ...[1, 0, 0], ...Array.from(cube.transform.matrix.toArray()),
      // bottom
      -1.0, -1.0, -1.0,  ...cubeColor, ...[0, -1, 0], ...Array.from(cube.transform.matrix.toArray()),
      -1.0, -1.0, 1.0,   ...cubeColor, ...[0, -1, 0], ...Array.from(cube.transform.matrix.toArray()),
      1.0, -1.0, 1.0,    ...cubeColor, ...[0, -1, 0], ...Array.from(cube.transform.matrix.toArray()),
      1.0, -1.0, -1.0,   ...cubeColor, ...[0, -1, 0], ...Array.from(cube.transform.matrix.toArray()),
    ];

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.vbo.set(this.gl, new Float32Array(cubeVertices));
    this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
  }

  protected onInit() {
    const { width, height } = this.app.canvas;

    camera = new PerspectiveCamera(45, width / height, 1, 2000);
    orbitControls = new OrbitControls(this.app.canvas, camera, { keyboard: true });

    camera.position.set(0, 0, 0.01);
    cube.transform.position.set(0, 0, -8);

    this.gl = this.app.context;
    this.ext = this.app.extensions.get('ANGLE_instanced_arrays');

    this.gl.viewport(0, 0, width, height);
    this.gl.clearColor(.14, .14, .14, 1);
    this.gl.enable(this.gl.DEPTH_TEST);

    const boxIndexBufferObject = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {
    // camera.right = canvasWidth;
    // camera.bottom = canvasHeight;
    // camera.update();

    this.setUniforms();
  }

  protected setAttributes() {
      const stride = (3 + 3 + 3 + 16) * Float32Array.BYTES_PER_ELEMENT;

      const pos = this.gl.getAttribLocation(this.program, 'a_position');
      this.gl.vertexAttribPointer(pos, 3, this.gl.FLOAT, false,  stride, 0);
      this.gl.enableVertexAttribArray(pos);

      const color = this.gl.getAttribLocation(this.program, 'a_color');
      this.gl.vertexAttribPointer(color, 3, this.gl.FLOAT, false,  stride, 3 * Float32Array.BYTES_PER_ELEMENT);
      this.gl.enableVertexAttribArray(color);

      const normal = this.gl.getAttribLocation(this.program, 'a_normal');
      this.gl.vertexAttribPointer(normal, 3, this.gl.FLOAT, false,  stride, (3 + 3) * Float32Array.BYTES_PER_ELEMENT);
      this.gl.enableVertexAttribArray(normal);

      const model = this.gl.getAttribLocation(this.program, 'a_model');
      this.gl.vertexAttribPointer(model, 4, this.gl.FLOAT, false, stride, (3 + 3 + 3) * Float32Array.BYTES_PER_ELEMENT);
      this.gl.vertexAttribPointer(model + 1, 4, this.gl.FLOAT, false, stride, (3 + 3 + 3 + 4) * Float32Array.BYTES_PER_ELEMENT);
      this.gl.vertexAttribPointer(model + 2, 4, this.gl.FLOAT, false, stride, (3 + 3 + 3 + 8) * Float32Array.BYTES_PER_ELEMENT);
      this.gl.vertexAttribPointer(model + 3, 4, this.gl.FLOAT, false, stride, (3 + 3 + 3 + 12) * Float32Array.BYTES_PER_ELEMENT);
      this.gl.enableVertexAttribArray(model);
      this.gl.enableVertexAttribArray(model + 1);
      this.gl.enableVertexAttribArray(model + 2);
      this.gl.enableVertexAttribArray(model + 3);
  }

  protected setUniforms() {
    const projection = this.gl.getUniformLocation(this.program, 'u_projection');

    this.gl.uniformMatrix4fv(projection, false, camera.lookAt(cube.transform.position).toArray());
  }
}
