import { Inject, VAO, VBO } from '@engine/core';

import { Entity } from '@engine/geometries';

import { Renderer } from './renderer';

export abstract class AbstractRenderer {
  @Inject() protected renderer: Renderer;

  protected entities = new Set<Entity>();
  protected gl: WebGLRenderingContext;
  protected vao = new VAO();
  protected vbo = new VBO();

  protected abstract vertices: number[];
  protected abstract normals: number[];

  private inited = false;

  init() {
    this.gl = this.renderer.gl;
    this.vao.bind(this.gl);
    this.vbo.bind(this.gl);

    this.inited = true;
  }

  abstract add(entity: Entity): void;
  abstract remove(entity: Entity): void;
  abstract onRender(): void;

  render() {
    if (!this.inited) this.init();

    this.onRender();
  };
}
