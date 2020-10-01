export class VBO {
  descriptor: WebGLBuffer | null = null;
  gl: WebGLRenderingContext;

  bind(gl: any) {
    this.gl = gl;

    if (!this.descriptor) this.descriptor = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.descriptor);

    return this;
  }

  set(data: Float32Array) {
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
  }

  insert(from: number, data: Float32Array) {
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, from, data);
  }
}
