import { Matrix4, Vector3 } from '@engine/core';

export class Transform {
  private _transform = new Matrix4();
  private _position: Vector3 = new Vector3();
  private _rotation: Vector3 = new Vector3();
  private _scale: Vector3 = new Vector3();

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
    this._rotation = rotation;
  }

  get scale() { return this._scale; }
  set scale(scale: Vector3) {
    if (this._scale.equals(scale)) return;
    this._scale.set(scale);
  }

  private update() {
    if (this._position.dirty) {
      this._transform.tx = this._position.x;
      this._transform.ty = this._position.y;
      this._transform.tz = this._position.z;

      this._position.dirty = false;
    }

    if (this._rotation.dirty) {
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
    }

    if (this._scale.dirty) {
      this._transform.a = this._scale.x;
      this._transform.e = this._scale.y;
      this._transform.j = this._scale.z;
    }
  }
}
