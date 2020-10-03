import { Type } from '@engine/core';
import { Provider } from './provider';
import { Type } from '@engine/core/types';

export class FactoryProvider<T> extends Provider<T> {
  constructor(private provide: Type<T>) {
    super();
  }

  resolve(): T {
    return new this.provide();
  }
}
