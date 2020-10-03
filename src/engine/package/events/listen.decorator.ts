import { EventEmitter } from '@engine/core';

import 'reflect-metadata';

export const EVENTS_METADATA_KEY = Symbol('EVENTS_KEY');

export type EventSelector = (context: any) => EventEmitter<any>;

export interface EventListener {
  global: Map<Symbol, string[]>,
  local: Map<EventSelector, string[]>
}

export function Listen(emitter: EventSelector);
export function Listen(eventName: Symbol);
export function Listen(arg0: any) {
  return function(target: any, propertyKey: string) {
    const listener: EventListener =
      Reflect.getMetadata(EVENTS_METADATA_KEY, target) || { global: new Map(), local: new Map() };

    const scope = typeof arg0 === 'symbol' ? 'global' : 'local';

    if (!listener[scope].has(arg0)) listener[scope].set(arg0, []);

    listener[scope].get(arg0)?.push(propertyKey);

    Reflect.defineMetadata(EVENTS_METADATA_KEY, listener, target);
  };
}
