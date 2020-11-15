import { Material, MaterialOptions } from '../material';

import vertexSource from './vertex.glsl';
import fragmentSource from './fragment.glsl';

export interface BasicMaterialOptions extends MaterialOptions {}

export class BasicMaterial extends Material {
  constructor(options?: BasicMaterialOptions) {
    super();

    this._id = 0;
    this.vertexSource = vertexSource;
    this.fragmentSource = fragmentSource;
  }
}
