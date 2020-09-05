import { Particle } from './particle';
import { Entity } from '../entity';

export class ParticleSystem<G, M> extends Entity<G, M> {
  private particles: Particle<G, M>[] = [];

  add(particle: G) {}

  get count(): number {
    return this.particles.length;
  }

  *[Symbol.iterator]() {
    for (let item of this.particles) yield item;
  }
}
