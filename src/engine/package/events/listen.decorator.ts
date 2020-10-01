import { EVENTS_METADATA_KEY } from './const';

import 'reflect-metadata';

export function Listen(eventName: Symbol) {
  return function(target: any, propertyKey: string) {
    const handlers: Map<Symbol, string[]> = Reflect.getMetadata(EVENTS_METADATA_KEY, target) || new Map<Symbol, string[]>();

    if (!handlers.has(eventName)) handlers.set(eventName, []);

    handlers.get(eventName)?.push(propertyKey);

    Reflect.defineMetadata(EVENTS_METADATA_KEY, handlers, target);
  };
}
