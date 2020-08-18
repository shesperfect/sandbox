import { Provider } from './provider';

export class ClassProvider<T> extends Provider<T> {
  instance: T;

  resolve(): T {
    if (!this.instance) {
      this.instance = {} as T;
    }

    return this.instance;
  }
}
