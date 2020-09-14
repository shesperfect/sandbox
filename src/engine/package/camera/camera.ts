import { Matrix4, Vector3 } from '@engine/core';

export abstract class Camera {
  position = new Vector3();

  protected projectionMatrix = new Matrix4();
  protected viewMatrix = new Matrix4();
  protected dirty = true;

  get matrix(): Matrix4 {
    return this.projectionMatrix.multiply(this.viewMatrix);
  }

  toArray(): Float32Array {
    return this.matrix.toArray();
  }

  lookAt(targetPosition = new Vector3(), upDirection = new Vector3(0, 1, 0)): this {
    const zAxis = this.position.clone().subtract(targetPosition).normalize();
    const xAxis = upDirection.cross(zAxis).normalize();
    const yAxis = zAxis.cross(xAxis).normalize();

    this.viewMatrix.fromArray([
      ...xAxis.toArray(), 0,
      ...yAxis.toArray(), 0,
      ...zAxis.toArray(), 0,
      ...this.position.toArray(), 1,
    ]);

    return this;
  }

  update() {
    if (this.dirty) {
      this.onUpdate();

      this.dirty = false;
    }
  };

  protected abstract onUpdate(): void;
}

