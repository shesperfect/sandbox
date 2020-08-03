import { Matrix4 } from '@core';

export abstract class Camera {
  protected _matrix = new Matrix4();
  protected dirty = true;

  get matrix(): Matrix4 {
    return this._matrix;
  }

  toArray(): Float32Array {
    return this.matrix.toArray();
  }

  update() {
    if (this.dirty) {
      this.onUpdate();

      this.dirty = false;
    }
  };

  protected abstract onUpdate(): void;
}

