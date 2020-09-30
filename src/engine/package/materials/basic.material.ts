import { Color } from '@engine/core';

import { Material } from './material';

interface BasicMaterialOptions {
  color?: Color;
}

const defaultOptions: Required<BasicMaterialOptions> = {
  color: new Color(255, 0, 0),
};

export class BasicMaterial extends Material {
  constructor(options?: BasicMaterialOptions) {
    super();

    const opts = {  };
  }
}
