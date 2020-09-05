import { Inject } from '@engine/core';

import { Scene } from '../scene';
import { Camera } from '../camera';

export class Renderer {
  @Inject('context') gl: WebGLRenderingContext;

  render(camera: Camera, scene: Scene) {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // render each renderer
  }
}
