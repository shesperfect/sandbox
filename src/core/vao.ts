export class VAO {
  descriptor: any;

  // bind(gl: any) {
  //   if (gl instanceof WebGLRenderingContext) {
  //     const ext = gl.getExtension('OES_vertex_array_object');
  //     if (!this.descriptor) this.descriptor = ext.createVertexArrayOES();
  //     ext.bindVertexArrayOES(this.descriptor);
  //   } else {
  //     if (!this.descriptor) this.descriptor = gl.createVertexArray();
  //     gl.bindVertexArray(this.descriptor);
  //   }
  // }
  //
  // dispose(gl) {
  //   if (!this.descriptor) return;
  //
  //   if (gl instanceof WebGLRenderingContext) {
  //     const ext = gl.getExtension('OES_vertex_array_object');
  //     ext.deleteVertexArrayOES(this.descriptor);
  //   } else {
  //     gl.deleteVertexArray(this.descriptor);
  //   }
  // }
}
