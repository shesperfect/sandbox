import React from 'react';

import { VAO, VBO, ShaderProgram } from '@core';
import { Canvas } from 'layout';
import { ControlPanel } from 'common/ControlPanel';

export abstract class BaseComponent<P, S> extends React.Component<P, S>{
  protected vao = new VAO();
  protected vbo = new VBO();

  constructor(props: P, private vertexSource: string, private fragmentSource: string) {
    super(props);
  }

  render() {
    return (
      <div className="editor">
        <div className="row">
          <div className="col-md-9 col-12">
            <Canvas onLoad={ gl => this.init(gl) } onRender={ gl => this.draw(gl) }/>
          </div>
          <div className="col-md-3 col-12 my-md-0 my-3">
            <ControlPanel />
          </div>
        </div>
      </div>
    );
  }

  protected abstract onInit(gl: any): void;
  protected abstract onRender(gl: any): void;

  private init(gl: any) {
    if (!gl) {
      throw new Error('Your browser doesn\'t support webgl');
    }

    const program = new ShaderProgram(gl, this.vertexSource, this.fragmentSource);

    this.vao.bind(gl);
    this.vbo.bind(gl).set(gl, new Float32Array([50, 50, 1, 50, 100, 1, 100, 100, 1]));

    const pos = gl.getAttribLocation(program, 'a_position');
    gl.vertexAttribPointer(pos, 3, gl.FLOAT, false,  0, 0);
    gl.enableVertexAttribArray(pos);

    this.onInit(gl);
  }

  private draw(gl: any) {
    this.vao.bind(gl);

    this.onRender(gl);
  }
}
