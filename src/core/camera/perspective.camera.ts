import { Camera } from './camera';

export class PerspectiveCamera extends Camera {
  constructor(public fov: number,
              public aspectRatio: number,
              public near: number,
              public far: number) {
    super();

    this.update();
  }

  protected onUpdate() {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * this.fov);
    const rangeInv = 1.0 / (this.near - this.far);

    this._matrix.a = f / this.aspectRatio;
    this._matrix.e = f;
    this._matrix.j = 2 / (this.near - this.far);
    this._matrix.j = (this.near + this.far) * rangeInv;
    this._matrix.tz = this.near * this.far * rangeInv * 2;
  }
}
