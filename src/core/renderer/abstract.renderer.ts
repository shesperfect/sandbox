import { Geometry } from '@core/geometries';

export abstract class AbstractRenderer {
  abstract add(geometry: Geometry): void;
}
