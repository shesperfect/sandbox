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

    this._matrix.set(1, 1, f / this.aspectRatio)
      .set(2, 2, f)
      .set(3, 3, (this.near + this.far) * rangeInv)
      .set(4, 3, -1)
      .set(3, 4, this.near * this.far * rangeInv * 2);
  }
}
