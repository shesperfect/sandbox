import { Renderable, ConeRenderer } from '@engine/renderer';

import { Geometry } from './geometry';

interface ConeOptions {
  radius?: number;
  height?: number;
  radialSegments?: number;
}

@Renderable(ConeRenderer)
export class ConeGeometry extends Geometry {
  private options: Required<ConeOptions> = {
    radius: 1,
    height: 1,
    radialSegments: 5,
  };

  constructor(opts?: ConeOptions) {
    super();

    this.options = { ...this.options, ...opts };

    this.generate();
  }

  private generate() {
    const radius = 0.5;
    const height = .5;
    // const thetaLength = Math.PI * 2 / this.options.radialSegments;
    const center = [0, 0, 0];
    const top = [0, height, 0];
    // let theta = 0;

    for (let i = 0; i < this.options.radialSegments; i++) {
      const theta = i / this.options.radialSegments * Math.PI * 2;
      const thetaNext = (i + 1) / this.options.radialSegments * Math.PI * 2;
      console.log(i + 1);
      const x1 = radius * Math.cos(theta);
      const y1 = 0;
      const z1 = radius * Math.sin(theta);

      const x2 = radius * Math.cos(thetaNext);
      const y2 = 0;
      const z2 = radius * Math.sin(thetaNext);

      this._vertices.push(
        ...top, x1, y1, z1, x2, y2, z2,
        ...center, x1, y1, z1, x2, y2, z2,
      );

      this._normals.push(
        Math.random(), Math.random(), Math.random(),
        Math.random(), Math.random(), Math.random(),
        Math.random(), Math.random(), Math.random(),
        Math.random(), Math.random(), Math.random(),
        Math.random(), Math.random(), Math.random(),
        Math.random(), Math.random(), Math.random(),
      );

      // theta += thetaLength;
    }
  }
}
