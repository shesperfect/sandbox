import { Matrix4, Vector3 } from '@core';

export class Transform {
  private _transform = new Matrix4();
  private _position: Vector3 = new Vector3();
  private _rotation: Vector3 = new Vector3();
  private _scale: Vector3 = new Vector3();

  constructor() {
    // subscriptions to elements changes
  }

  get matrix(): Matrix4 {
    return this._transform;
  }

  get position() { return this._position; }
  set position(position: Vector3) {
    if (this._position.equals(position)) return;

    this._position.set(position);
    this._transform.tx = position.x;
    this._transform.ty = position.y;
    this._transform.tz = position.z;
  }

  get rotation() { return this._rotation; }
  set rotation(rotation: Vector3) {
    if (this._rotation === rotation) return;

    // rotateX(angleInRadians: number) {
    //   const c = Math.cos(angleInRadians);
    //   const s = Math.sin(angleInRadians);
    //
    //   this.transform.e = c;
    //   this.transform.f = s;
    //   this.transform.i = -s;
    //   this.transform.j = c;
    // }
    //
    // rotateY(angleInRadians: number) {
    //   const c = Math.cos(angleInRadians);
    //   const s = Math.sin(angleInRadians);
    //
    //   this.transform.a = c;
    //   this.transform.c = -s;
    //   this.transform.h = s;
    //   this.transform.j = c;
    // }
    //
    // rotateZ(angleInRadians: number) {
    //   const c = Math.cos(angleInRadians);
    //   const s = Math.sin(angleInRadians);
    //
    //   this.transform.a = c;
    //   this.transform.b = s;
    //   this.transform.d = -s;
    //   this.transform.e = c;
    // }

    this._rotation = rotation;

  }

  get scale() { return this._scale; }
  set scale(scale: Vector3) {
    if (this._scale.equals(scale)) return;

    this._scale.set(scale);
    this._transform.a = scale.x;
    this._transform.e = scale.y;
    this._transform.j = scale.z;
  }

  private update() {}
}
