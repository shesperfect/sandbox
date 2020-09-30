import React from 'react';

import { Application, PerspectiveCamera } from '@engine';

import { ControlPanel } from 'common';

import { Canvas } from 'layout';

export abstract class BaseComponent<P, S> extends React.Component<P, S> {
  protected app: Application;

  render() {
    return (
      <div className="editor">
        <div className="row">
          <div className="col-md-9 col-12">
            <Canvas onLoad={ canvas => this.init(canvas) }
                    onRender={ () => this.onRender() }
                    onResize={ (w, h) => this.onResize(w, h) } />
          </div>
          <div className="col-md-3 col-12 my-md-0 my-3">
            <ControlPanel />
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    // TODO: destroy all objects
  }

  protected abstract onInit(): void;
  protected abstract onRender(): void;
  protected abstract onResize(canvasWidth: number, canvasHeight: number): void;
  protected abstract setAttributes(): void;
  protected abstract setUniforms(): void;

  private init(canvas: HTMLCanvasElement | null) {
    if (!canvas) throw new Error('Canvas doesn\'t exist');

    this.app = new Application({
      camera: new PerspectiveCamera(45, canvas.width / canvas.height, 1, 2000),
      canvas,
    });

    this.onInit();
    this.setAttributes();
    this.setUniforms();
  }
}
