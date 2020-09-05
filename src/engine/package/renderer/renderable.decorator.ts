import { Type } from '@engine/core';

import { AbstractRenderer } from './abstract.renderer';
import { Geometry } from '../geometries';

import 'reflect-metadata';

export const RENDERABLE_METADATA = Symbol('renderable_metadata');

export function Renderable<T extends Type<AbstractRenderer>>(renderer: T) {
  return function<T extends Type<Geometry>>(constructor: T) {
    Reflect.defineMetadata(RENDERABLE_METADATA, renderer, constructor);
  }
}
