import { EVENTS_METADATA_KEY } from './const';

import 'reflect-metadata';

export class EventsSystem {
  directory = new Map<Symbol, Function[]>();

  register(target: any) {
    const handlers = Reflect.getMetadata(EVENTS_METADATA_KEY, target);

    handlers.forEach((callbacks, key) => {
      if (!this.directory.has(key)) this.directory.set(key, []);

      callbacks.forEach(callback => {
        this.directory.get(key)?.push(target[callback].bind(target));
      });
    });
  }

  unregister(target: any) {}

  notify(target: any, eventName: Symbol) {}

  broadcast(eventName: Symbol, payload?: any) {
    this.directory.get(eventName)?.forEach(callback => {
      callback(payload);
    });
  }
}
