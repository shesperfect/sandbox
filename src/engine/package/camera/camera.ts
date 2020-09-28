import { Matrix4, Transformable, Vector3 } from '@engine/core';

export abstract class Camera extends Transformable {
  target = new Vector3();

  protected projectionMatrix = new Matrix4();
  protected lookAtMatrix = new Matrix4();

  get matrix(): Matrix4 {
    if (this.projectionMatrix.isDirty()) {
      this.update();

      this.projectionMatrix.toPristine();
    }

    this.lookAt();

    return Matrix4.temp.fromMatrix(this.projectionMatrix)
      .multiply(this.transform.matrix.clone().multiply(this.lookAtMatrix).inverse());
  }

  lookAt(target = new Vector3(), upDirection = new Vector3(0, 1, 0)): this {
    const zAxis = this.transform.position.clone().subtract(target).normalize();
    const xAxis = upDirection.cross(zAxis).normalize();
    const yAxis = zAxis.cross(xAxis).normalize();

    this.lookAtMatrix.fromArray([
      ...xAxis.toArray(), 0,
      ...yAxis.toArray(), 0,
      ...zAxis.toArray(), 0,
      0, 0, 0, 1
    ]);

    if (!this.target.equals(target)) this.target.set(target);

    return this;
  }

  protected abstract update(): void;
}

