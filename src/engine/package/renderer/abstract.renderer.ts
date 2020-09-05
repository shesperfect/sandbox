import { Geometry } from '../geometries';

export abstract class AbstractRenderer {
  abstract add(geometry: Geometry): void;
  abstract render(): void;
}
