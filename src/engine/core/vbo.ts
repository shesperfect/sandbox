export class VBO {
  descriptor: WebGLBuffer | null = null;

  bind(gl: any) {
    if (!this.descriptor) this.descriptor = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.descriptor);

    return this;
  }

  set(gl: any, data: Float32Array) {
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  }

  insert(gl: any, from: number, data: Float32Array) {
    this.bind(gl);
    gl.bufferSubData(gl.ARRAY_BUFFER, from, data);
  }
}
