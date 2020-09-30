import { Inject } from '@engine/core';

import { Renderer } from '../renderer';
import { Entity } from '../geometries';

export abstract class AbstractRenderer {
  @Inject() private renderer: Renderer;

  protected entities = new Set<Entity>();
  protected gl: WebGLRenderingContext;

  constructor() {
    this.gl = this.renderer.gl;
  }

  protected abstract vertices: number[];
  protected abstract normals: number[];

  abstract add(entity: Entity): void;
  abstract remove(entity: Entity): void;
  abstract render(): void;
}
