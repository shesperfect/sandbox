import { Inject, Type } from '@engine/core';

import { SceneSystem } from '../scene';
import { Camera } from '../camera';
import { InitEvent, Listen } from '../events';
import { Clock } from '../clock';
import { AbstractRenderer } from '@engine/renderer/abstract.renderer';

export class Renderer {
  @Inject() private scenes: SceneSystem;
  @Inject('camera') private camera: Camera;
  @Inject('canvas') private canvas: HTMLCanvasElement;

  private _gl: WebGLRenderingContext;
  private clock = new Clock();

  get gl(): WebGLRenderingContext {
    return this._gl;
  }
  @Listen(InitEvent)
  init() {
    const gl = this.canvas.getContext('webgl');

    if (!gl) {
      throw new Error('Your browser doesn\'t support webgl');
    }

    this._gl = gl;

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clearColor(.4, .4, .4, 1);
    this.gl.enable(this.gl.DEPTH_TEST);

    this.render();
  }

  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // this.scenes.current.tree.forEach(([renderer], material) => {
    //   renderer.render();
    // });

    requestAnimationFrame(this.render.bind(this));
  }
}
