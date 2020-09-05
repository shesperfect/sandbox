import { Provider } from './provider';

export class ValueProvider<T> extends Provider<T> {
  constructor(private value: T) {
    super();
  }

  resolve(): T {
    return this.value;
  }
}
