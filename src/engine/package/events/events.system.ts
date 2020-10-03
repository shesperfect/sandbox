import { EventEmitter, Subscription } from '@engine/core';
import { EventListener, EVENTS_METADATA_KEY, EventSelector } from './listen.decorator';

import 'reflect-metadata';

export class EventsSystem {
  private emitters = new Map<Symbol, EventEmitter<any>>();
  private subscriptions = new Map<Symbol, Subscription>();

  register(target: any) {
    const listener: EventListener = Reflect.getMetadata(EVENTS_METADATA_KEY, target);

    listener.local.forEach((callbacks: string[], emitter: EventSelector) => {
      emitter(target).subscribe(args => {
        callbacks.forEach((callback: string) => target[callback](args))
      });
    });

    listener.global.forEach((callbacks: string[], key: Symbol) => {
      if (!this.emitters.has(key)) {
        this.emitters.set(key, new EventEmitter<any>());
        this.subscriptions.set(key, new Subscription());
      }

      callbacks.forEach(callback => {
        this.subscriptions.get(key)?.add(target[callback].bind(target));
      });
    });
  }

  unregister(target: any) {}

  notify(target: any, eventName: Symbol) {}

  broadcast(eventName: Symbol, payload?: any) {
    this.emitters.get(eventName)?.emit(payload);
  }
}
