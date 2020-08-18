import { Token } from '@core';

export abstract class Provider<T> {
  token: Token<T>;

  abstract resolve(): T;
}
