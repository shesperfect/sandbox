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
    const f = Math.tan(Math.PI * 0.5 * (1 - this.fov / 180));
    const rangeInv = 1.0 / (this.near - this.far);

    this._matrix.a = f / this.aspectRatio;
    this._matrix.f = f;
    this._matrix.k = (this.near + this.far) * rangeInv;
    this._matrix.l = -1;
    this._matrix.tz = this.near * this.far * rangeInv * 2;
  }
}
