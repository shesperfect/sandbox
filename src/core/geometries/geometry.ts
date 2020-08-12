import { Matrix4 } from '@core';

export class Geometry {
  transform = new Matrix4();

  // get position(): number {}
  // get y(): number {}
  // get z(): number {}
  // get width(): number {}
  // get height(): number {}

  rotateX(angleInRadians: number) {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);

    this.transform.e = c;
    this.transform.f = s;
    this.transform.i = -s;
    this.transform.j = c;
  }

  rotateY(angleInRadians: number) {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);

    this.transform.a = c;
    this.transform.c = -s;
    this.transform.h = s;
    this.transform.j = c;
  }

  rotateZ(angleInRadians: number) {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);

    this.transform.a = c;
    this.transform.b = s;
    this.transform.d = -s;
    this.transform.e = c;
  }

  scale(sx: number, sy: number, sz: number) {
    this.transform.a = sx;
    this.transform.e = sy;
    this.transform.j = sz;
  }

  translate(tx: number, ty: number, tz = 0) {
    this.transform.tx = tx;
    this.transform.ty = ty;
    this.transform.tz = tz;
  }
}
