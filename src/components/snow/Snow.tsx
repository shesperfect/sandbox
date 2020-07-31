import React from 'react';

import { ControlPanel } from 'common';
import { Canvas } from 'layout';

import './Snow.scss';

export class SnowComponent extends React.Component<any, any> {
  render() {
    return (
      <div className="editor">
        <div className="row">
          <div className="col-9">
            <Canvas onLoad={ gl => this.init(gl) }/>
          </div>
          <div className="col-3">
            <ControlPanel />
          </div>
        </div>
      </div>
    );
  }

  private init(gl: any | null) {
    if (!gl) {
      throw new Error('Your browser doesn\'t support webgl');
    }

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1);
  }
}
