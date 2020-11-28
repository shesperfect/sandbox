import React from 'react';

import { Application, OrbitControls, PerspectiveCamera } from '@engine';

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

  private init(canvas: HTMLCanvasElement | null) {
    if (!canvas) throw new Error('Canvas doesn\'t exist');

    const camera = new PerspectiveCamera(45, canvas.width / canvas.height, 0, 2000);
    camera.transform.position.set(0, 0, 4);
    const controls = new OrbitControls(canvas, camera);

    this.app = new Application({ camera, canvas, controls });

    this.app.renderer.rendered$.subscribe(() => this.onRender());

    this.onInit();
  }
}
