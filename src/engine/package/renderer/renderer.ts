import { Inject } from '@engine/core';

import { SceneSystem } from '../scene';
import { Camera } from '../camera';
import { InitEvent, Listen } from '../events';
import { Clock } from '../clock';

export class Renderer {
  @Inject() private scenes: SceneSystem;
  @Inject() private camera: Camera;
  @Inject() private canvas: HTMLCanvasElement;

  private readonly _gl: WebGLRenderingContext;
  private clock = new Clock();

  constructor() {
    const gl = this.canvas.getContext('webgl');

    if (!gl) {
      throw new Error('Your browser doesn\'t support webgl');
    }

    this._gl = gl;
  }

  get gl(): WebGLRenderingContext {
    return this._gl;
  }

  @Listen(InitEvent)
  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    console.log('render!!');

    requestAnimationFrame(this.render.bind(this));
  }
}
