import { AbstractRenderer, RENDERABLE_METADATA } from '@core/renderer';
import { Geometry } from '@core/geometries';

export class Scene {
  geometries = new Map<AbstractRenderer, Set<Geometry>>();

  add(geometry: Geometry) {
    const renderer = Reflect.getMetadata(RENDERABLE_METADATA, geometry.constructor);

    if (!this.geometries.get(renderer)) this.geometries.set(renderer, new Set());

    this.geometries.get(renderer)?.add(geometry);
  }

  remove(geometry: Geometry) {
    const renderer = Reflect.getMetadata(RENDERABLE_METADATA, geometry.constructor);

    if (!this.geometries.get(renderer)) return;

    this.geometries.get(renderer)?.delete(geometry);
  }
}
