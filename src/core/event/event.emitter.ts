import { Subscription } from './subscription';

export class EventEmitter {
  subscribe(...args: any): Subscription {
    return new Subscription();
  }
}
