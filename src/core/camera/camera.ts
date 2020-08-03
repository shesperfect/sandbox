import { Matrix4 } from '@core';

export abstract class Camera {
  protected _matrix = new Matrix4();

  get matrix(): Matrix4 {
    return this._matrix;
  }

  abstract update(width: number, height: number): void;
}

