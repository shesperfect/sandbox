import { Type } from '@core';

import 'reflect-metadata';

const INJECTABLE_METADATA_KEY = Symbol('INJECTABLE_KEY');

/**
 * This class decorator adds a boolean property to the class
 * metadata, marking it as 'injectable'.
 */
export function Injectable() {
  return function(target: any) {
    Reflect.defineMetadata(INJECTABLE_METADATA_KEY, true, target);

    return target;
  };
}

/**
 * Provide an easy way to query whether a class is
 * injectable. Our container will reject classes which aren't
 * marked as injectable.
 * @param { Type<T> } target - target class constructor
 */
export function isInjectable<T>(target: Type<T>): boolean {
  return !!Reflect.getMetadata(INJECTABLE_METADATA_KEY, target);
}
