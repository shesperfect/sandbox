export const rand = (min = 0, max = 1): number =>
  Math.floor(min + (max - min) * Math.random());

export const isNumber = (value: any) => typeof value === 'number' && isFinite(value);
