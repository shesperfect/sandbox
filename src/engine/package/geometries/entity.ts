import { Geometry, Material } from '@engine';

import { Transform } from './transform';

export class Entity {
  transform = new Transform();

  constructor(protected geometry: Geometry, protected material: Material) {}

  render() {
    console.log('hui');
  }
}
