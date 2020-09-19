import {
  Validate, isColorUnit, isNormalized, leadingZero, NOT_COLOR_UNIT, NOT_NORMALIZED, Vector3,
} from '@engine/core';

export class Color {
  private array = new Float32Array(4);

  constructor(red = 0, green = 0, blue = 0, alpha = 1) {
    this.array[0] = red / 255;
    this.array[1] = green / 255;
    this.array[2] = blue / 255;
    this.array[3] = alpha;
  }

  static fromHex(hex: number) {
    const strHex = hex.toString(16);

    const r = Number.parseInt(strHex.substring(0, 2), 16);
    const g = Number.parseInt(strHex.substring(2, 4), 16);
    const b = Number.parseInt(strHex.substring(4), 16);

    return new Color(r, g, b);
  }

  static RGBToHex(r: number, g: number, b: number): number {
    const res = `${leadingZero((r * 255).toString(16))}${leadingZero((g * 255).toString(16))}${leadingZero((g * 255).toString(16))}`;

    console.log(leadingZero((r * 255).toString(16)));

    return 0;
  }

  @Validate(isColorUnit, Error(NOT_COLOR_UNIT))
  set red(value: number) { this.array[0] = value / 255; }
  get red(): number { return this.array[0]; }

  @Validate(isColorUnit, Error(NOT_COLOR_UNIT))
  set green(value: number) { this.array[1] = value / 255; }
  get green(): number { return this.array[1]; }

  @Validate(isColorUnit, Error(NOT_COLOR_UNIT))
  set blue(value: number) { this.array[2] = value / 255; }
  get blue(): number { return this.array[2]; }

  @Validate(isNormalized, Error(NOT_NORMALIZED))
  set alpha(value: number) { this.array[3] = value; }
  get alpha(): number { return this.array[3]; }

  get rgb(): Vector3 {
    return new Vector3(this.array[0], this.array[1], this.array[2]);
  }

  toArray(): Float32Array {
    return this.array;
  }
}
