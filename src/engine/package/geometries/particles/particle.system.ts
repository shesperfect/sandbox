import { Particle } from './particle';

import { Entity } from '../entity';

export class ParticleSystem extends Entity {
  private particles: Particle[] = [];

  add(particle: Particle) {
    this.particles.push(particle);
  }

  create(): Particle {
    const particle = new Particle(this.geometry, this.material);

    this.add(particle);

    return particle;
  }

  get count(): number {
    return this.particles.length;
  }

  *[Symbol.iterator]() {
    for (let item of this.particles) yield item;
  }
}
