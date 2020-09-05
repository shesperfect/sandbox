import { Provider } from './provider';

export class FactoryProvider<T> extends Provider<T> {
  resolve(): T {
    return {} as T;
  }
}
