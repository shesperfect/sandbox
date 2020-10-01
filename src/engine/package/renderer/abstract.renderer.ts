import { InitEvent, Listen } from '@engine';
import { Inject, VAO, VBO } from '@engine/core';

import { Renderer } from '../renderer';
import { Entity } from '../geometries';

export abstract class AbstractRenderer {
  @Inject() protected renderer: Renderer;

  protected entities = new Set<Entity>();
  protected gl: WebGLRenderingContext;
  protected vao = new VAO();
  protected vbo = new VBO();

  protected abstract vertices: number[];
  protected abstract normals: number[];

  @Listen(InitEvent)
  init() {
    this.gl = this.renderer.gl;
    this.vao.bind(this.gl);
    this.vbo.bind(this.gl);
  }

  abstract add(entity: Entity): void;
  abstract remove(entity: Entity): void;
  abstract render(): void;
}
