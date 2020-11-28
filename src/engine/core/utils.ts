export const rand = (min = 0, max = 1, decimal = false): number =>
  decimal
    ? min + (max - min) * Math.random()
    : Math.floor(min + (max - min) * Math.random());

export const isNumber = (value: any): boolean => typeof value === 'number' && isFinite(value);
export const isColorUnit = (value: number): boolean => value >= 0 && value < 256;
export const isNormalized = (value: number): boolean => value >= 0 && value <= 1;

export const leadingZero = (numStr: string): string => numStr.length === 1 ? `0${numStr}` : numStr;
export const clamp = (num: number, min: number, max: number) => num <= min ? min : num >= max ? max : num;
