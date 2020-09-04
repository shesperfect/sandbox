import { Token } from '@core';

import { INJECT_METADATA_KEY } from './const';

import 'reflect-metadata';

export function Inject(injectionToken?: Token<any> | Symbol | string) {
  return function(target: any, propertyKey: string) {
    const deps = Reflect.getMetadata(INJECT_METADATA_KEY, target) || [];
    const token = isInjectionToken(injectionToken)
      ? injectionToken
      : Reflect.getMetadata('design:type', target, propertyKey);

    deps.push({ propertyKey, token });

    Reflect.defineMetadata(INJECT_METADATA_KEY, deps, target);
  };
}

const isInjectionToken = (token: any): boolean =>
  token instanceof Function
    || typeof token === 'symbol'
    || typeof token === 'string';
