import { Material } from '@engine';

import { ShaderProgram } from './shader.program';

export class ShaderSystem {
  get(material: Material, gl): ShaderProgram {
    return new ShaderProgram(gl, material.vertexSource, material.fragmentSource);
  }
}
