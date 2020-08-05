import { AbstractRenderer, RENDERABLE_METADATA } from '@core/renderer';
import { Geometry } from '@core/geometries';

export class Scene {
  private geometries = new Map<AbstractRenderer, Geometry>();

  add(geometry: Geometry) {
    console.log(geometry);
    console.log(Reflect.getMetadata(RENDERABLE_METADATA, geometry.constructor));

    // this.geometries.add(geometry);
  }

  remove(geometry: Geometry) {
    // this.geometries.delete(geometry);
  }

  render() {
    // this.geometries.forEach(geometry => {});
  }
}
