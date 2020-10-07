import { EventEmitter, Matrix4, Vector3 } from '@engine/core';

export class Transform {
  changed$ = new EventEmitter();

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
    this._position.changed$.subscribe(({ prop, value }) => {
      if (prop === 'x') this.positionTransform.set(1, 4, value);
      else if (prop === 'y') this.positionTransform.set(2, 4, value);
      else if (prop === 'z') this.positionTransform.set(3, 4, value);

      this.changed$.emit();
    });

    this._rotation.changed$.subscribe(({ prop, value }) => {
      if (prop === 'x') {
        const c = Math.cos(value);
        const s = Math.sin(value);

        this.rotationXTransform.set(2, 2, c);
        this.rotationXTransform.set(3, 2, s);
        this.rotationXTransform.set(2, 3, -s);
        this.rotationXTransform.set(3, 3, c);
      }
      else if (prop === 'y') {
        const c = Math.cos(value);
        const s = Math.sin(value);

        this.rotationYTransform.set(1, 1, c);
        this.rotationYTransform.set(3, 1, -s);
        this.rotationYTransform.set(1, 3, s);
        this.rotationYTransform.set(3, 3, c);
      }
      else if (prop === 'z') {
        const c = Math.cos(value);
        const s = Math.sin(value);

        this.rotationZTransform.set(1, 1, c);
        this.rotationZTransform.set(2, 1, s);
        this.rotationZTransform.set(1, 2, -s);
        this.rotationZTransform.set(2, 2, c);
      }

      this.changed$.emit();
    });

    this._scale.changed$.subscribe(({ prop, value }) => {
      if (prop === 'x') this.scaleTransform.set(1, 1, value);
      else if (prop === 'y') this.scaleTransform.set(2, 2, value);
      else if (prop === 'z') this.scaleTransform.set(3, 3, value);

      this.changed$.emit();
    });
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
