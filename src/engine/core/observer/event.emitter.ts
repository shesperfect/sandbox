import { Subscription } from './subscription';

export class EventEmitter<T> {
  private subscription: Subscription = new Subscription();

  subscribe(fn?: Function): Subscription {
    fn && this.subscription.add(fn);

    return this.subscription;
  }

  emit(data?: T) {
    this.subscription.execute(data);
  }
}
