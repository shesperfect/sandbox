import { Color } from '@engine/core';

export abstract class AbstractLight {
  protected constructor(protected _color = new Color(1, 1, 1, 1)) {}

  set intensity(value: number) {
    this.color.alpha = value;
  }

  get color(): Color {
    return this._color;
  }
}
