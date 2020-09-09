export class Matrix4 {
  static temp = new Matrix4();

  private array = new Float32Array(16);

  private dirty = false;

  /**
   *     Matrix view      |        Array view
   * | a | d | h | tx |   |    | a  | b  | c  | 0 |
   * | b | e | i | ty |   |    | d  | e  | f  | 0 |
   * | c | f | j | tz |   |    | h  | i  | j  | 0 |
   * | 0 | 0 | 0 |  1 |   |    | tx | ty | tz | 1 |
   *                      |
   */
  constructor(
    a = 1, b = 0, c = 0,
    d = 0, e = 1, f = 0,
    h = 0, i = 0, j = 1,
    tx = 0, ty = 0, tz = 0,
  ) {
    this.array[0] = a;
    this.array[1] = b;
    this.array[2] = c;
    this.array[3] = 0;
    this.array[4] = d;
    this.array[5] = e;
    this.array[6] = f;
    this.array[7] = 0;
    this.array[8] = h;
    this.array[9] = i;
    this.array[10] = j;
    this.array[11] = 0;
    this.array[12] = tx;
    this.array[13] = ty;
    this.array[14] = tz;
    this.array[15] = 1;
  }

  set(matrix: Matrix4): Matrix4 {
    return this.fromArray(matrix.toArray());
  }

  get a(): number { return this.array[0]; }
  set a(value: number) { this.array[0] = value; }

  get b(): number { return this.array[1]; }
  set b(value: number) { this.array[1] = value; }

  get c(): number { return this.array[2]; }
  set c(value: number) { this.array[2] = value; }

  get d(): number { return this.array[4]; }
  set d(value: number) { this.array[4] = value; }

  get e(): number { return this.array[5]; }
  set e(value: number) { this.array[5] = value; }

  get f(): number { return this.array[6]; }
  set f(value: number) { this.array[6] = value; }

  get h(): number { return this.array[8]; }
  set h(value: number) { this.array[8] = value; }

  get i(): number { return this.array[9]; }
  set i(value: number) { this.array[9] = value; }

  get j(): number { return this.array[10]; }
  set j(value: number) { this.array[10] = value; }

  get tx(): number { return this.array[12]; }
  set tx(value: number) { this.array[12] = value; }

  get ty(): number { return this.array[13]; }
  set ty(value: number) { this.array[13] = value; }

  get tz(): number { return this.array[14]; }
  set tz(value: number) { this.array[14] = value; }

  fromArray(array: number[] | Float32Array): Matrix4 {
    if (array.length !== 16) {
      // eslint-disable-next-line no-console
      console.error('Array length isn`t 16. Are you sure?');

      return this;
    }

    this.array[0] = array[0];
    this.array[1] = array[1];
    this.array[2] = array[2];
    this.array[4] = array[4];
    this.array[5] = array[5];
    this.array[6] = array[6];
    this.array[8] = array[8];
    this.array[9] = array[9];
    this.array[10] = array[10];
    this.array[12] = array[12];
    this.array[13] = array[13];
    this.array[14] = array[14];

    this.dirty = true;

    return this;
  }

  multiply(mB: Matrix4): Matrix4 {
    const mA = this;

    const a = mA.a * mB.a + mA.d * mB.b + mA.h * mB.c;
    const d = mA.a * mB.d + mA.d * mB.e + mA.h * mB.f;
    const h = mA.a * mB.h + mA.d * mB.i + mA.h * mB.j;
    const tx = mA.a * mB.tx + mA.d * mB.ty + mA.h * mB.tz + mA.tx;

    const b = mA.b * mB.a + mA.e * mB.b + mA.i * mB.c;
    const e = mA.b * mB.d + mA.e * mB.e + mA.i * mB.f;
    const i = mA.b * mB.h + mA.e * mB.i + mA.i * mB.j;
    const ty = mA.b * mB.tx + mA.e * mB.ty + mA.i * mB.tz + mA.ty;

    const c = mA.c * mB.a + mA.f * mB.b + mA.j * mB.c;
    const f = mA.c * mB.d + mA.f * mB.e + mA.j * mB.f;
    const j = mA.c * mB.h + mA.f * mB.i + mA.j * mB.j;
    const tz = mA.c * mB.tx + mA.f * mB.ty + mA.j * mB.tz + mA.tz;

    [this.a, this.d, this.h, this.tx, this.b, this.e, this.i, this.ty, this.c, this.f, this.j, this.tz] = [a, d, h, tx, b, e, i, ty, c, f, j, tz];

    this.dirty = true;

    return this;
  }

  /**
   * Возвращает массив значений матрицы.
   * @description: Если transpose = true, то значения матрицы в возвращаемом массиве транспонированы.
   * Если есть out, то значение записываются в него (новый экземпляр Float32Array не создается).
   */
  toArray(): Float32Array {
    return this.array;
  }

  /**
   * Сбрасывает текущую матрицу до единичной.
   */
  identity(): Matrix4 {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 0;
    this.e = 1;
    this.f = 0;
    this.h = 0;
    this.i = 0;
    this.j = 1;
    this.tx = 0;
    this.ty = 0;
    this.tz = 0;

    this.dirty = true;

    return this;
  }

  /**
   * Возвращает копию текущей матрицы.
   */
  clone(): Matrix4 {
    return new Matrix4(
      this.array[0], this.array[1], this.array[2], this.array[4],
      this.array[5], this.array[6], this.array[8], this.array[9],
      this.array[10], this.array[12], this.array[13], this.array[14],
    );
  }

  /**
   * Проверяет, равна ли текущая матрица переданной.
   * @param matrix - переданная матрица.
   */
  equals(matrix: Matrix4): boolean {
    return this.a === matrix.a && this.b === matrix.b
      && this.c === matrix.c && this.d === matrix.d
      && this.e === matrix.e && this.f === matrix.f
      && this.h === matrix.h && this.i === matrix.i
      && this.j === matrix.j && this.tx === matrix.tx
      && this.ty === matrix.ty && this.tz === matrix.tz;
  }

  /**
   * Возвращает, изменилась ли матрица.
   */
  private isDirty(): boolean {
    return this.dirty;
  }
}
