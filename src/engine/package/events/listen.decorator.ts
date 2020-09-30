import { Token } from '@engine/core';

export function Listen(eventName: Token<any> | Symbol | string) {
  return function(target: any, propertyKey: string) {
  };
}
