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

  get view(): Matrix4 {
    return new Matrix4();
  }

  protected abstract onUpdate(): void;
}

