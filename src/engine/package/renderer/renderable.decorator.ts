import { Geometry } from '@engine';
import { Type } from '@engine/core';

import { AbstractRenderer } from './abstract.renderer';

import 'reflect-metadata';

export const RENDERABLE_METADATA = Symbol('renderable_metadata');

export function Renderable<T extends Type<AbstractRenderer>>(renderer: T) {
  return function<T extends Type<Geometry>>(target: T) {
    Reflect.defineMetadata(RENDERABLE_METADATA, renderer, target);
  }
}
