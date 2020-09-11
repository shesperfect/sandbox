import { Camera } from './camera';

export class OrthographicCamera extends Camera {
  constructor(private near: number, private far: number,
              private _left = 0, private _right = 1,
              private _top = 0, private _bottom = 1) {
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
    this._matrix
      .set(1, 1, 2 / (this.right - this.left))
      .set(2, 2, 2 / (this.top - this.bottom))
      .set(3, 3, 2 / (this.near - this.far))
      .set(1, 4, (this.left + this.right) / (this.left - this.right))
      .set(2, 4, (this.bottom + this.top) / (this.bottom - this.top))
      .set(3, 4, (this.near + this.far) / (this.near - this.far));
  }
}
