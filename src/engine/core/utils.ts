export const rand = (min = 0, max = 1, decimal = false): number =>
  decimal
    ? min + (max - min) * Math.random()
    : Math.floor(min + (max - min) * Math.random());

export const isNumber = (value: any) => typeof value === 'number' && isFinite(value);
