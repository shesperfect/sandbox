import { Matrix4, Vector3 } from '@engine/core';

export class Transform {
  private _transform = new Matrix4();
  private _position: Vector3 = new Vector3();
  private _rotation: Vector3 = new Vector3();
  private _scale: Vector3 = new Vector3(1, 1, 1);

  private positionTransform = new Matrix4();
  private rotationXTransform = new Matrix4();
  private rotationYTransform = new Matrix4();
  private rotationZTransform = new Matrix4();
  private scaleTransform = new Matrix4();

  constructor() {
    this._position.x$.subscribe(value => this.positionTransform.set(1, 4, value));
    this._position.y$.subscribe(value => this.positionTransform.set(2, 4, value));
    this._position.z$.subscribe(value => this.positionTransform.set(3, 4, value));
    this._rotation.x$.subscribe(value => {
      const c = Math.cos(value);
      const s = Math.sin(value);

      this.rotationXTransform.set(2, 2, c);
      this.rotationXTransform.set(3, 2, s);
      this.rotationXTransform.set(2, 3, -s);
      this.rotationXTransform.set(3, 3, c);
    });
    this._rotation.y$.subscribe(value => {
      const c = Math.cos(value);
      const s = Math.sin(value);

      this.rotationYTransform.set(1, 1, c);
      this.rotationYTransform.set(3, 1, -s);
      this.rotationYTransform.set(1, 3, s);
      this.rotationYTransform.set(3, 3, c);
    });
    this._rotation.z$.subscribe(value => {
      const c = Math.cos(value);
      const s = Math.sin(value);

      this.rotationZTransform.set(1, 1, c);
      this.rotationZTransform.set(2, 1, s);
      this.rotationZTransform.set(1, 2, -s);
      this.rotationZTransform.set(2, 2, c);
    });
    this._scale.x$.subscribe(value => this.scaleTransform.set(1, 1, value));
    this._scale.y$.subscribe(value => this.scaleTransform.set(2, 2, value));
    this._scale.z$.subscribe(value => this.scaleTransform.set(3, 3, value));
  }

  get matrix(): Matrix4 {
    this.update();
    return this._transform;
  }

  get position() { return this._position; }
  set position(position: Vector3) {
    if (this._position.equals(position)) return;
    this._position.set(position);
  }

  get rotation() { return this._rotation; }
  set rotation(rotation: Vector3) {
    if (this._rotation === rotation) return;
    this._rotation.set(rotation);
  }

  get scale() { return this._scale; }
  set scale(scale: Vector3) {
    if (this._scale.equals(scale)) return;
    this._scale.set(scale);
  }

  private update() {
    this._transform
      .identity()
      .multiply(this.positionTransform)
      .multiply(this.rotationXTransform)
      .multiply(this.rotationYTransform)
      .multiply(this.rotationZTransform)
      .multiply(this.scaleTransform);
  }
}
