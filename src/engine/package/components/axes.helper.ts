import { Entity, LineGeometry } from '@engine/geometries';
import { BasicMaterial } from '@engine/materials';

export class AxesHelper extends Entity {
  constructor(size = 1) {
    const geometry = new LineGeometry();

    // const xAxis = new Entity(new LineGeometry([
    //   0, 0, 0,
    //   size, 0, 0,
    // ]), new BasicMaterial({
    //   color: new Color(255, 0, 0),
    // }));
    // const yAxis = new Entity(new LineGeometry([
    //   0, 0, 0,
    //   0, size, 0,
    // ]), new BasicMaterial({
    //   color: new Color(0, 255, 0),
    // }));
    // const zAxis = new Entity(new LineGeometry([
    //   0, 0, 0,
    //   0, 0, size,
    // ]), new BasicMaterial({
    //   color: new Color(0, 0, 255),
    // }));

    super(geometry, new BasicMaterial());
  }
}
