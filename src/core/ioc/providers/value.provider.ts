import { Provider } from './provider';

export class ValueProvider<T> extends Provider<T> {
  resolve(): T {
    return {} as T;
  }
}
