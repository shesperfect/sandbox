import { Color } from '@engine/core';
import { AbstractLight } from './light.abstract';

export class AmbientLight extends AbstractLight{
  constructor(color: Color | number) {
    super(color instanceof Color ? color : Color.fromHex(color));
  }
}
