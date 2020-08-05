import { Type } from '@core';
import { AbstractRenderer } from '@core/renderer';
import { Geometry } from '@core/geometries';

import 'reflect-metadata';

export const RENDERABLE_METADATA = Symbol('renderable_metadata');

export function Renderable<T extends Type<AbstractRenderer>>(renderer: T) {
  console.log('renderer', renderer);
  return function<T extends Type<Geometry>>(constructor: T) {
    Reflect.defineMetadata(RENDERABLE_METADATA, renderer, constructor);
  }
}
