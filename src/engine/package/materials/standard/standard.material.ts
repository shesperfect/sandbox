import { Material } from '../material';

import vertexSource from './vertex.glsl';
import fragmentSource from './fragment.glsl';

export class StandardMaterial extends Material {
  constructor() {
    super();

    this._id = 1;
    this.vertexSource = vertexSource;
    this.fragmentSource = fragmentSource;
  }
}
