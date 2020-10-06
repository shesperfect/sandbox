import { Token } from '@engine/core';

export abstract class Provider<T> {
  token: Token<T>;

  abstract resolve(params?: any): T;
}
