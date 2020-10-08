import { Material } from '../material';

import vertexSource from './vertex.glsl';
import fragmentSource from './fragment.glsl';

export class BasicMaterial extends Material {
  constructor() {
    super();

    this._id = 0;
    this.vertexSource = vertexSource;
    this.fragmentSource = fragmentSource;
  }
}
