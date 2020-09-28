import { Geometry, Material } from '@engine';
import { Transformable } from '@engine/core';

export class Entity extends Transformable {
  constructor(protected geometry: Geometry, protected material: Material) {
    super();
  }

  render() {
    console.log('hui');
  }
}
