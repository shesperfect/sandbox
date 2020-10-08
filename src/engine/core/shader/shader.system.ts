import { Material } from '@engine';

import { ShaderProgram } from './shader.program';

export class ShaderSystem {
  private programs = new Map<number, ShaderProgram>();

  get(material: Material, gl): ShaderProgram {
    if (this.programs.has(material.id)) return this.programs.get(material.id) as any;

    const program =
      new ShaderProgram(gl, material.vertexSource, material.fragmentSource);

    this.programs.set(material.id, program);

    return program;
  }
}
