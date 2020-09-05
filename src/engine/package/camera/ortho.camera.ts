import { Camera } from './camera';

export class OrthographicCamera extends Camera {
  constructor(private near: number, private far: number,
              private _left = 0, private _right = 1,
              private _bottom = 0, private _top = 0) {
    super();

    this.update();
  }

  get left(): number { return this._left; }
  set left(value: number) {
    this._left = value;
    this.dirty = true;
  }

  get right(): number { return this._right; }
  set right(value: number) {
    this._right = value;
    this.dirty = true;
  }

  get bottom(): number { return this._bottom; }
  set bottom(value: number) {
    this._bottom = value;
    this.dirty = true;
  }

  get top(): number { return this._top; }
  set top(value: number) {
    this._top = value;
    this.dirty = true;
  }

  protected onUpdate() {
    this._matrix.a = 2 / (this.right - this.left);
    this._matrix.e = 2 / (this.top - this.bottom);
    this._matrix.j = 2 / (this.near - this.far);
    this._matrix.tx = (this.left + this.right) / (this.left - this.right);
    this._matrix.ty = (this.bottom + this.top) / (this.bottom - this.top);
    this._matrix.tz = (this.near + this.far) / (this.near - this.far);
  }
}
