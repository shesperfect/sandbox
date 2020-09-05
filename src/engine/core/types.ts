export interface Type<T> extends Function {
  new (...args: any[]): T
}

export type Factory<T> = () => T;

export type Token<T> = Type<T> | Symbol | string;
