import { Geometry } from '../geometry';

export class ParticleSystem<G, M> extends Geometry {
  add(particle: G) {}

  get count(): number {
    return 10;
  }
}
