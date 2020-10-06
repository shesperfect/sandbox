import { Entity } from '@engine/geometries';
import { Camera } from '@engine/camera';
import {
  ENTITY_ALREADY_EXISTS, ENTITY_DOESNT_EXIST,
  Inject,
  ShaderProgram,
  VAO, VBO,
} from '@engine/core';

import { Renderer } from './renderer';

export abstract class AbstractRenderer {
  @Inject() protected renderer: Renderer;
  @Inject('camera') protected camera: Camera;

  protected entities = new Set<Entity>();
  protected gl: WebGLRenderingContext;
  protected vao = new VAO();
  protected vbo = new VBO();

  protected abstract vertices: number[];
  protected abstract normals: number[];

  private inited = false;

  constructor(protected shader: ShaderProgram) {}

  init() {
    this.gl = this.renderer.gl;
    this.vao.bind(this.gl);
    this.vbo.bind(this.gl);

    this.onInit();

    this.inited = true;
  }

  abstract onInit(): void;
  abstract onAdd(entity: Entity): void;
  abstract onRemove(entity: Entity): void;
  abstract onRender(): void;

  add(entity: Entity) {
    if (this.entities.has(entity)) throw new Error(ENTITY_ALREADY_EXISTS);

    this.entities.add(entity);

    this.onAdd(entity);
  }

  remove(entity: Entity) {
    if (!this.entities.has(entity)) throw new Error(ENTITY_DOESNT_EXIST);

    this.entities.delete(entity);

    this.onRemove(entity);
  }

  render() {
    if (!this.inited) this.init();

    this.onRender();
  };
}
