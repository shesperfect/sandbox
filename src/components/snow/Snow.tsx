import React from 'react';

import { VAO, VBO } from '@core';

import { ControlPanel } from 'common';
import { Canvas } from 'layout';

import vertexSource from '../../common/shaders/base.vert';
import fragmentSource from '../../common/shaders/base.frag';

import './Snow.scss';

export class SnowComponent extends React.Component<any, any> {
  private vao = new VAO();
  private vbo = new VBO();

  render() {
    return (
      <div className="editor">
        <div className="row">
          <div className="col-md-9 col-12">
            <Canvas onLoad={ gl => this.init(gl) } onRender={ gl => this.draw(gl) }/>
          </div>
          <div className="col-md-3 col-12 mt-sm-3 mb-sm-3">
            <ControlPanel />
          </div>
        </div>
      </div>
    );
  }

  draw(gl: any) {
    this.vao.bind(gl);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3)
  }

  private init(gl: any | null) {
    if (!gl) {
      throw new Error('Your browser doesn\'t support webgl');
    }

    gl.clearColor(0, 0, 0, 1);

    const FSIZE = Float32Array.BYTES_PER_ELEMENT;
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    this.vao.bind(gl);
    this.vbo.bind(gl).set(gl, new Float32Array([0, 0, 0, 1, 1, 1]));

    const pos = gl.getAttribLocation(program, 'a_position');
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false,  FSIZE * 5, 0);
    gl.enableVertexAttribArray(pos);
  }
}
