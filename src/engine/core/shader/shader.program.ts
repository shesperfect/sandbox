function createShader(gl: any, type: number, source: string) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  } else {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
}

export class ShaderProgram {
  program: WebGLProgram;

  constructor(gl: any, vertexShaderSrc: string, fragmentShaderSrc: string) {
    const program = gl.createProgram();
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      this.program = program;
      gl.useProgram(program);
    } else {
      console.warn(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
    }
  }
}
