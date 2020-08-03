export class Matrix4 {
  private array = new Float32Array(16);

  private dirty = false;

  /**
   * | a | d | h | tx |
   * | b | e | i | ty |
   * | c | f | j | tz |
   * | 0 | 0 | 0 |  1 |
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

  /**
   * Упрощенное умножение матрицы на переданную.
   * @description: Результат умножения записывается как текущая матрица. Возвращает текущую матрицу.
   * ВАЖНО: элементы нижней строки принимаются всегда как 0 0 0 1 и в умножении не участвуют.
   */
  multiply(matrix: Matrix4): Matrix4 {
    const a11 = this.array[0]; const a12 = this.array[4]; const a13 = this.array[8]; const a14 = this.array[12];
    const a21 = this.array[1]; const a22 = this.array[5]; const a23 = this.array[9]; const a24 = this.array[13];
    const a31 = this.array[2]; const a32 = this.array[6]; const a33 = this.array[10]; const a34 = this.array[14];

    const b = matrix.toArray();
    const b11 = b[0]; const b12 = b[3]; const b13 = b[6]; const b14 = b[9];
    const b21 = b[1]; const b22 = b[4]; const b23 = b[7]; const b24 = b[10];
    const b31 = b[2]; const b32 = b[5]; const b33 = b[8]; const b34 = b[11];

    this.array[0] = a11 * b11 + a12 * b21 + a13 * b31;
    this.array[4] = a11 * b12 + a12 * b22 + a13 * b32;
    this.array[8] = a11 * b13 + a12 * b23 + a13 * b33;
    this.array[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;

    this.array[1] = a21 * b11 + a22 * b21 + a23 * b31;
    this.array[5] = a21 * b12 + a22 * b22 + a23 * b32;
    this.array[9] = a21 * b13 + a22 * b23 + a23 * b33;
    this.array[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;

    this.array[2] = a31 * b11 + a32 * b21 + a33 * b31;
    this.array[6] = a31 * b12 + a32 * b22 + a33 * b32;
    this.array[10] = a31 * b13 + a32 * b23 + a33 * b33;
    this.array[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;

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
