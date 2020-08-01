import { BaseComponent } from 'common';

import vertexSource from 'common/shaders/base.vert';
import fragmentSource from 'common/shaders/base.frag';

import './Snow.scss';

export class SnowComponent extends BaseComponent<any, any> {
  constructor(props: any) {
    super(props, vertexSource, fragmentSource);
  }

  protected onRender(gl: any) {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3)
  }

  protected onInit(gl: any | null) {
    gl.clearColor(1, 1, 1, 1);
  }
}
