import { Camera } from './camera';

export class OrthographicCamera extends Camera {
  constructor(public left: number, public right: number,
              public bottom: number, public top: number,
              public near: number, public far: number) {
    super();

    this.update();
  }

  update() {
    this._matrix.a = 2 / (this.right - this.left);
    this._matrix.e = 2 / (this.top - this.bottom);
    this._matrix.j = 2 / (this.near - this.far);
    this._matrix.tx = (this.left + this.right) / (this.left - this.right);
    this._matrix.ty = (this.bottom + this.top) / (this.bottom - this.top);
    this._matrix.tz = (this.near + this.far) / (this.near - this.far);
  }
}
