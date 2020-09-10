import { Matrix4, Vector3 } from '@engine/core';

export class Transform {
  private _transform = new Matrix4();
  private _position: Vector3 = new Proxy(new Vector3(), {
    set: (obj, prop, value) => {
      if (prop === 'x') {
        this.positionTransform.tx = value;
      }
      if (prop === 'y') {
        this.positionTransform.ty = value;
      }
      if (prop === 'z') {
        this.positionTransform.tz = value;
      }

      obj[prop] = value;

      return true;
    }
  });
  private _rotation: Vector3 = new Proxy(new Vector3(), {
    set: (obj, prop, value) => {
      if (prop === 'x') {
        const c = Math.cos(value);
        const s = Math.sin(value);

        this.rotationXTransform.f = c;
        this.rotationXTransform.g = s;
        this.rotationXTransform.j = -s;
        this.rotationXTransform.k = c;
      }

      if (prop === 'y') {
        const c = Math.cos(value);
        const s = Math.sin(value);

        this.rotationYTransform.a = c;
        this.rotationYTransform.c = -s;
        this.rotationYTransform.i = s;
        this.rotationYTransform.k = c;
      }

      if (prop === 'z') {
        const c = Math.cos(value);
        const s = Math.sin(value);

        this.rotationZTransform.a = c;
        this.rotationZTransform.b = s;
        this.rotationZTransform.e = -s;
        this.rotationZTransform.f = c;
      }

      obj[prop] = value;

      return true;
    }
  });
  private _scale: Vector3 = new Proxy(new Vector3(1, 1, 1), {
    set: (obj, prop, value) => {
      if (prop === 'x') {
        this.scaleTransform.a = value;
      }
      if (prop === 'y') {
        this.scaleTransform.f = value;
      }
      if (prop === 'z') {
        this.scaleTransform.k = value;
      }

      obj[prop] = value;

      return true;
    }
  });

  private positionTransform = new Matrix4();
  private rotationXTransform = new Matrix4();
  private rotationYTransform = new Matrix4();
  private rotationZTransform = new Matrix4();
  private scaleTransform = new Matrix4();

  get matrix(): Matrix4 {
    this.update();
    return this._transform;
  }

  get position() { return this._position; }
  set position(position: Vector3) {
    if (this._position.equals(position)) return;

    this.positionTransform.tx = position.x;
    this.positionTransform.ty = position.y;
    this.positionTransform.tz = position.z;

    this._position.set(position);
  }

  get rotation() { return this._rotation; }
  set rotation(rotation: Vector3) {
    if (this._rotation === rotation) return;
    this._rotation = rotation;
  }

  get scale() { return this._scale; }
  set scale(scale: Vector3) {
    if (this._scale.equals(scale)) return;

    this.scaleTransform.a = scale.x;
    this.scaleTransform.f = scale.y;
    this.scaleTransform.k = scale.z;

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
