import { Vector3 } from './vector';
import { Matrix4 } from '@engine/core/math/matrix4';

/**
 * Class representing a quaternion.
 * Consider only unit cases.
 */
export class Quaternion {
  private w: number;
  private v: Vector3;

  /**
   * Create a quaternion.
   * @param {number} theta - The amount of rotation in radians.
   * @param {Vector3} direction - The unit vector of rotation.
   */
  constructor(private theta = 0, private direction = new Vector3()) {
    this.w = Math.cos(theta / 2);
    this.v = direction.multiply(Math.sin(theta / 2));
  }

  static identity(): Quaternion {
    return new Quaternion(1, new Vector3());
  }

  static Slerp(a: Quaternion, b: Quaternion, t: number): Quaternion {
    return a.slerp(b, t);
  };

  negate(): this {
    this.w *= -1;
    this.v.multiply(-1);

    return this;
  }

  get magnitude(): number {
    return Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.v.x, 2) + Math.pow(this.v.y, 2) + Math.pow(this.v.z, 2))
  }

  normalize(): this {
    this.w /= this.magnitude;
    this.v.multiply(1 / this.magnitude);

    return this;
  }

  /**
   * Get the difference of two quaternions.
   * @param {Quaternion} q - The quaternion to divide.
   * @return {Quaternion} The difference quaternion.
   */
  quaternionDiff(q: Quaternion): Quaternion {
    return q.multiply(this.conjugate);
  }

  /**
   * Returns the angle between this quaternion and quaternion q in radians.
   */
  angleDiff(q: Quaternion): number {
    return this.quaternionDiff(q).w;
  }

  dot(q: Quaternion): number {
    return this.w * q.w + this.v.x * q.v.x + this.v.y * q.v.y + this.v.z * q.v.z;
  }

  slerp(q: Quaternion, t: number): Quaternion {
    let cosOmega = this.dot(q);
    let sinOmega;
    let k0, k1;

    if (cosOmega < 0) {
      q.negate();
      cosOmega *= -1;
    }

    if (cosOmega > 0.9999) {
      k0 = 1 - t;
      k1 = t;
    } else {
      sinOmega = Math.sqrt(1 - cosOmega * cosOmega);
      const omega = Math.atan2(sinOmega, cosOmega);
      const oneOverSinOmega = 1 / sinOmega;

      k0 = Math.sin((1 - t) * omega) * oneOverSinOmega;
      k1 = Math.sin(t * omega) * oneOverSinOmega;
    }

    this.w = this.w * k0 + q.w * k1;
    this.v.x = this.v.x * k0 + q.v.x * k1;
    this.v.y = this.v.y * k0 + q.v.y * k1;
    this.v.z = this.v.z * k0 + q.v.z * k1;

    return this;
  }

  get conjugate(): Quaternion {
    return new Quaternion(this.w, this.v.clone().multiply(-1));
  }

  clone(): Quaternion {
    return new Quaternion(this.theta, this.direction);
  }

  multiply(q: Quaternion): this;
  multiply(w: number, x: number, y: number, z: number): this;
  multiply(arg0: number | Quaternion, arg1 = 0, arg2 = 0, arg3 = 0): this {
    if (arg0 instanceof Quaternion) {
      this.w = this.w * arg0.w - this.v.x * arg0.v.x - this.v.y * arg0.v.y - this.v.z * arg0.v.z;
      this.v.x = this.w * arg0.v.x + this.v.x * arg0.w + this.v.y * arg0.v.z - this.v.z * arg0.v.y;
      this.v.y = this.w * arg0.v.y + this.v.y * arg0.w + this.v.z * arg0.v.x - this.v.x * arg0.v.z;
      this.v.z = this.w * arg0.v.z + this.v.z * arg0.w + this.v.x * arg0.v.y - this.v.y * arg0.v.x;
    } else {
      this.w = this.w * arg0 - this.v.x * arg1 - this.v.y * arg2 - this.v.z * arg3;
      this.v.x = this.w * arg1 + this.v.x * arg0 + this.v.y * arg3 - this.v.z * arg2;
      this.v.y = this.w * arg2 + this.v.y * arg0 + this.v.z * arg1 - this.v.x * arg3;
      this.v.z = this.w * arg3 + this.v.z * arg0 + this.v.x * arg2 - this.v.y * arg1;
    }

    return this;
  }

  toMatrix(): Matrix4 {
    return new Matrix4(
      1 - 2 * Math.pow(this.v.y, 2) - 2 * Math.pow(this.v.z, 2),
      2 * this.v.x * this.v.y - 2 * this.w * this.v.z,
      2 * this.v.x * this.v.z + 2 * this.w * this.v.y,
      0,
      2 * this.v.x * this.v.y + 2 * this.w * this.v.z,
      1 - 2 * Math.pow(this.v.x, 2) - 2 * Math.pow(this.v.z, 2),
      2 * this.v.y * this.v.z - 2 * this.w * this.v.x,
      0,
      2 * this.v.x * this.v.z - 2 * this.w * this.v.y,
      2 * this.v.y * this.v.z + 2 * this.w * this.v.x,
      1 - 2 * Math.pow(this.v.x, 2) - 2 * Math.pow(this.v.y, 2),
    );
  }
}
