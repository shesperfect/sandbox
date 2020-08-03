import React from 'react';

import { VAO, VBO, ShaderProgram } from '@core';
import { Camera } from '@core/camera';

import { Canvas } from 'layout';
import { ControlPanel } from 'common/ControlPanel';

export abstract class BaseComponent<P, S, C> extends React.Component<P, S>{
  protected gl: C;
  protected vao = new VAO();
  protected vbo = new VBO();

  constructor(props: P,
              private vertexSource: string,
              private fragmentSource: string,
              private camera: Camera) {
    super(props);
  }

  render() {
    return (
      <div className="editor">
        <div className="row">
          <div className="col-md-9 col-12">
            <Canvas onLoad={ gl => this.init(gl) } onRender={ () => this.draw() }/>
          </div>
          <div className="col-md-3 col-12 my-md-0 my-3">
            <ControlPanel />
          </div>
        </div>
      </div>
    );
  }

  protected abstract onInit(): void;
  protected abstract onRender(): void;
  protected abstract setAttributes(program: WebGLProgram): void;

  private init(gl: any) {
    if (!gl) {
      throw new Error('Your browser doesn\'t support webgl');
    }

    this.gl = gl;

    // TODO: Optimize
    const sProgram = new ShaderProgram(gl, this.vertexSource, this.fragmentSource);

    this.vao.bind(gl);
    this.vbo.bind(gl);

    this.setAttributes(sProgram.program);
    this.onInit();
  }

  private draw() {
    this.onRender();
  }
}
