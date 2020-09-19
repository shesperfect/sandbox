import { Color, Vector3 } from '@engine/core';
import { AbstractLight } from './light.abstract';

export class DirectionalLight extends AbstractLight {
  private _direction: Vector3;

  constructor(direction = new Vector3(0, -1, 0), color = new Color(1, 1, 1, 1)) {
    super(color);

    this._direction = direction;
  }

  get direction(): Vector3 {
    if (this._direction.dirty) {
      this._direction.normalize();
      this._direction.dirty = false;
    }

    return this._direction;
  }
}
