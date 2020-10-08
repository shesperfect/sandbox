import { Material } from '../material';

interface ShaderMaterialOptions {
  vertexSource: string;
  fragmentSource: string;
}

export class ShaderMaterial extends Material {
  constructor(private options: ShaderMaterialOptions) {
    super();
    this._id = Math.random();
    this.vertexSource = options.vertexSource;
    this.fragmentSource = options.fragmentSource;
  }
}
