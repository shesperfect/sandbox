import { Subscription } from './subscription';

export class EventEmitter<T> {
  observers = new Set<Function>();

  subscribe(fn: Function): Subscription {
    this.observers.add(fn);

    return new Subscription(() => this.observers.delete(fn));
  }

  emit(data: T) {
    this.observers.forEach(subscriber => subscriber(data));
  }
}
