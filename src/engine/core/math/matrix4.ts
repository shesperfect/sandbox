export class Matrix4 {
  static temp = new Matrix4();

  private array = new Float32Array(16);

  private dirty = false;

  /**
   *     Matrix view      |        Array view
   * | a | e | i | tx |   |    | a  | b  | c  | d  |
   * | b | f | j | ty |   |    | e  | f  | g  | h  |
   * | c | g | k | tz |   |    | i  | j  | k  | l  |
   * | d | h | l | tw |   |    | tx | ty | tz | tw |
   *                      |
   */
  constructor(
    a =  1, b =  0, c =  0, d =  0,
    e =  0, f =  1, g =  0, h =  0,
    i =  0, j =  0, k =  1, l =  0,
    tx = 0, ty = 0, tz = 0, tw = 1,

  ) {
    this.array[0] = a;
    this.array[1] = b;
    this.array[2] = c;
    this.array[3] = d;
    this.array[4] = e;
    this.array[5] = f;
    this.array[6] = g;
    this.array[7] = h;
    this.array[8] = i;
    this.array[9] = j;
    this.array[10] = k;
    this.array[11] = l;
    this.array[12] = tx;
    this.array[13] = ty;
    this.array[14] = tz;
    this.array[15] = tw;
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

  get d(): number { return this.array[3]; }
  set d(value: number) { this.array[3] = value; }

  get e(): number { return this.array[4]; }
  set e(value: number) { this.array[4] = value; }

  get f(): number { return this.array[5]; }
  set f(value: number) { this.array[5] = value; }

  get g(): number { return this.array[6]; }
  set g(value: number) { this.array[6] = value; }

  get h(): number { return this.array[7]; }
  set h(value: number) { this.array[7] = value; }

  get i(): number { return this.array[8]; }
  set i(value: number) { this.array[8] = value; }

  get j(): number { return this.array[9]; }
  set j(value: number) { this.array[9] = value; }

  get k(): number { return this.array[10]; }
  set k(value: number) { this.array[10] = value; }

  get l(): number { return this.array[11]; }
  set l(value: number) { this.array[11] = value; }

  get tx(): number { return this.array[12]; }
  set tx(value: number) { this.array[12] = value; }

  get ty(): number { return this.array[13]; }
  set ty(value: number) { this.array[13] = value; }

  get tz(): number { return this.array[14]; }
  set tz(value: number) { this.array[14] = value; }

  get tw(): number { return this.array[15]; }
  set tw(value: number) { this.array[15] = value; }

  fromArray(array: number[] | Float32Array): Matrix4 {
    if (array.length !== 16) {
      // eslint-disable-next-line no-console
      console.error('Array length isn`t 16. Are you sure?');

      return this;
    }

    for (let i = 0; i < array.length; i++) this.array[i] = array[i];

    this.dirty = true;

    return this;
  }

  multiply(mB: Matrix4): Matrix4 {
    const mA = this;

    const a = mA.a * mB.a + mA.e * mB.b + mA.i * mB.c + mA.tx * mB.d;
    const e = mA.a * mB.e + mA.e * mB.f + mA.i * mB.g + mA.tx * mB.h;
    const i = mA.a * mB.i + mA.e * mB.j + mA.i * mB.k + mA.tx * mB.l;
    const tx = mA.a * mB.tx + mA.e * mB.ty + mA.i * mB.tz + mA.tx * mB.tw;

    const b = mA.b * mB.a + mA.f * mB.b + mA.j * mB.c + mA.ty * mB.d;
    const f = mA.b * mB.e + mA.f * mB.f + mA.j * mB.g + mA.ty * mB.h;
    const j = mA.b * mB.i + mA.f * mB.j + mA.j * mB.k + mA.ty * mB.l;
    const ty = mA.b * mB.tx + mA.f * mB.ty + mA.j * mB.tz + mA.ty * mB.tw;

    const c = mA.c * mB.a + mA.g * mB.b + mA.k * mB.c + mA.tz * mB.d;
    const g = mA.c * mB.e + mA.g * mB.f + mA.k * mB.g + mA.tz * mB.h;
    const k = mA.c * mB.i + mA.g * mB.j + mA.k * mB.k + mA.tz * mB.l;
    const tz = mA.c * mB.tx + mA.g * mB.ty + mA.k * mB.tz + mA.tz * mB.tw;

    const d = mA.d * mB.a + mA.h * mB.b + mA.l * mB.c + mA.tw * mB.d;
    const h = mA.d * mB.e + mA.h * mB.f + mA.l * mB.g + mA.tw * mB.h;
    const l = mA.d * mB.i + mA.h * mB.j + mA.l * mB.k + mA.tw * mB.l;
    const tw = mA.d * mB.tx + mA.h * mB.ty + mA.l * mB.tz + mA.tw * mB.tw;

    [
      this.a, this.e, this.i, this.tx,
      this.b, this.f, this.j, this.ty,
      this.c, this.g, this.k, this.tz,
      this.d, this.h, this.l, this.tw,
    ] = [
      a, e, i, tx,
      b, f, j, ty,
      c, g, k, tz,
      d, h, l, tw,
    ];

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
    this.e = 0;
    this.f = 1;
    this.g = 0;
    this.h = 0;
    this.i = 0;
    this.j = 0;
    this.k = 1;
    this.l = 0;
    this.tx = 0;
    this.ty = 0;
    this.tz = 0;
    this.tw = 1;

    this.dirty = true;

    return this;
  }

  /**
   * Возвращает копию текущей матрицы.
   */
  clone(): Matrix4 {
    return new Matrix4(
      this.array[0], this.array[1], this.array[2], this.array[3],
      this.array[4], this.array[5], this.array[6], this.array[7],
      this.array[8], this.array[9], this.array[10], this.array[11],
      this.array[12], this.array[13], this.array[14], this.array[15],
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
      && this.g === matrix.g && this.h === matrix.h
      && this.i === matrix.i && this.j === matrix.j
      && this.k === matrix.k && this.l === matrix.l
      && this.tx === matrix.tx && this.ty === matrix.ty
      && this.tz === matrix.tz && this.tw === matrix.tw;
  }

  /**
   * Возвращает, изменилась ли матрица.
   */
  private isDirty(): boolean {
    return this.dirty;
  }
}
