export class Matrix4 {
  private array = new Float32Array(16);

  private dirty = false;

  /**
   *        Matrix view         |            Array view
   * | A11 | A12 | A13 | A14    |    | A11 | A21 | A31 | A41 |
   * | A21 | A22 | A23 | A24    |    | A12 | A22 | A32 | A42 |
   * | A31 | A32 | A33 | A34    |    | A13 | A23 | A33 | A43 |
   * | A41 | A42 | A43 | A44    |    | A14 | A24 | A34 | A44 |
   *                            |
   */
  constructor(
    a11 = 1, a21 = 0, a31 = 0, a41 = 0,
    a12 = 0, a22 = 1, a32 = 0, a42 = 0,
    a13 = 0, a23 = 0, a33 = 1, a43 = 0,
    a14 = 0, a24 = 0, a34 = 0, a44 = 1,

  ) {
    this.array[0] = a11;
    this.array[1] = a21;
    this.array[2] = a31;
    this.array[3] = a41;
    this.array[4] = a12;
    this.array[5] = a22;
    this.array[6] = a32;
    this.array[7] = a42;
    this.array[8] = a13;
    this.array[9] = a23;
    this.array[10] = a33;
    this.array[11] = a43;
    this.array[12] = a14;
    this.array[13] = a24;
    this.array[14] = a34;
    this.array[15] = a44;
  }

  static temp = new Matrix4();

  set(rowIndex: number, columnIndex: number, value: number): Matrix4 {
    this.array[(columnIndex - 1) * 4 + rowIndex - 1] = value;

    this.dirty = true;

    return this;
  }

  get(rowIndex: number, columnIndex: number): number {
    return this.array[(columnIndex - 1) * 4 + rowIndex - 1];
  }

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

  fromMatrix(matrix: Matrix4): Matrix4 {
    return this.fromArray(matrix.toArray());
  }

  multiply(multiplier: Matrix4 | number): Matrix4 {
    if (typeof multiplier === 'number') {
      this.array.forEach((item, i, arr) => arr[i] = item * multiplier);
    } else {
      const arr: number[] = [];

      for (let j = 1; j <= 4; j++)
        for (let i = 1; i <= 4; i++) {
          let res = 0;

          for (let k = 1; k <= 4; k++) res += this.get(i, k) * multiplier.get(k, j);

          arr.push(res);
        }

      this.fromArray(arr);
    }

    this.dirty = true;

    return this;
  }

  /**
   * Возвращает массив значений матрицы.
   */
  toArray(): Float32Array {
    return this.array;
  }

  /**
   * Сбрасывает текущую матрицу до единичной.
   */
  identity(): Matrix4 {
    for (let i = 1; i <= 4; i++)
      for (let j = 1; j <= 4; j++) this.set(i, j, Number(i === j));

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
   */
  equals(matrix: Matrix4): boolean {
    const arr = matrix.toArray();

    return !this.array.some((el, i) => el !== arr[i]);
  }

  /**
   * Возврщает определитель матрицы.
   */
  det(): number {
    return this.get(1, 1) * this.getMinor(1, 1) -
      this.get(1, 2) * this.getMinor(1, 2) +
      this.get(1, 3) * this.getMinor(1, 3) -
      this.get(1, 4) * this.getMinor(1, 4);
  }

  /**
   * Обращает текущую матрицу.
   */
  inverse(): Matrix4 {
    const det = this.det();

    if (!det) throw new Error('The matrix is degenerate. Determinant can\'t be  zero.');

    return this.fromMatrix(this.getCofactor().multiply(1 / det));
  }

  /**
   * Возвращает транспонированную сопряженную матрицу.
   */
  getCofactor(): Matrix4 {
    const c = new Matrix4();

    for (let i = 1; i <= 4; i++)
      for (let j = 1; j <= 4; j++) c.set(i, j, Math.pow(-1, i + j) * this.getMinor(i, j));

    return c.transpose();
  }

  /**
   * Транспонирует текущую матрицу.
   */
  transpose(): Matrix4 {
    const arr: number[] = [];

    for (let i = 1; i <= 4; i++)
      for (let j = 1; j <= 4; j++) arr.push(this.get(i, j));

    this.fromArray(arr);

    return this;
  }

  /**
   * Возвращает алгеброическое дополнение.
   */
  getMinor(rowIndex: number, columnIndex: number): number {
    const sub = this.array.filter((el, i) =>
      Math.ceil((i + 1) / 4) !== columnIndex && (i) % 4 + 1 !== rowIndex);

    return sub[0] * sub[4] * sub[8] +
      sub[1] * sub[5] * sub[6] +
      sub[3] * sub[7] * sub[2] -
      sub[2] * sub[4] * sub[6] -
      sub[0] * sub[5] * sub[7] -
      sub[1] * sub[3] * sub[8];
  }

  /**
   * Возвращает, изменилась ли матрица.
   */
  isDirty(): boolean {
    return this.dirty;
  }

  toPristine() {
    this.dirty = false;
  }
}
