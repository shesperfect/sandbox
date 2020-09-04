import { Provider } from './provider';
import { Type } from '@core';

export class ClassProvider<T> extends Provider<T> {
  instance: T;

  constructor(private provide: Type<T>) {
    super();
  }

  resolve(): T {
    if (!this.instance) {
      this.instance = new this.provide();
    }

    return this.instance;
  }
}
