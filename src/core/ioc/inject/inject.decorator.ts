import { Token } from '../types';

import 'reflect-metadata';

const INJECT_METADATA_KEY = Symbol('INJECT_KEY');

/**
 * Parameter decorator, it takes a token to map the parameter to
 */
export function Inject(token?: Token<any>) {
  return function(target: any, propertyKey: string | symbol) {
    console.log(target[propertyKey]);
    Reflect.defineMetadata(INJECT_METADATA_KEY, token, target);
    return target;
  };
}
export function getInjectionToken(target: any, index: number) {
  return Reflect.getMetadata(INJECT_METADATA_KEY, target, `index-${index}`) as Token<any> | undefined;
}
