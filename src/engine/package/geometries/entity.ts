import { Geometry, Material } from '@engine';
import { Transformable } from '@engine/core';

export class Entity extends Transformable {
  constructor(protected _geometry: Geometry, protected _material: Material) {
    super();
  }

  get material(): Material { return this._material; }

  get geometry(): Geometry { return this._geometry; }

  render() {
    console.log('hui');
  }
}
