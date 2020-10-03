import { Type } from '@engine/core';
import { Provider } from './provider';

export class FactoryProvider<T> extends Provider<T> {
  constructor(private provide: Type<T>) {
    super();
  }

  resolve(): T {
    return new this.provide();
  }
}
