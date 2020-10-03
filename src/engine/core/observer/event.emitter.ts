import { Subscription } from './subscription';

export class EventEmitter<T> {
  subscription: Subscription = new Subscription();

  subscribe(fn: Function): Subscription {
    this.subscription.add(fn);

    return this.subscription;
  }

  emit(data: T) {
    this.subscription.execute(data);
  }
}
