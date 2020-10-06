import { Type } from '@engine/core';

import { Provider } from './provider';

export class ClassProvider<T> extends Provider<T> {
  instance: T;

  constructor(private provide: Type<T>) {
    super();
  }

  resolve(params = []): T {
    if (!this.instance) {
      this.instance = new this.provide(...params);
    }

    return this.instance;
  }
}
