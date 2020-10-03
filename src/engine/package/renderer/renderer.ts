import { Container, Inject, NO_WEBGL, Type } from '@engine/core';

import { SceneSystem } from '@engine/scene';
import { Camera } from '@engine/camera';
import { InitEvent, Listen } from '@engine/events';
import { Material } from '@engine/materials';
import { Entity } from '@engine/geometries';

import { AbstractRenderer } from './abstract.renderer';
import { RENDERABLE_METADATA } from './renderable.decorator';

export class Renderer {
  @Inject() private scenes: SceneSystem;
  @Inject('camera') private camera: Camera;
  @Inject('canvas') private canvas: HTMLCanvasElement;

  private _gl: WebGLRenderingContext;
  private renderers = new Map<Material, Map<Type<AbstractRenderer>, AbstractRenderer>>();

  constructor(private container: Container) {}

  get gl(): WebGLRenderingContext {
    return this._gl;
  }
  @Listen(InitEvent)
  init() {
    const gl = this.canvas.getContext('webgl');

    if (!gl) {
      throw new Error(NO_WEBGL);
    }

    this._gl = gl;
    this._gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this._gl.clearColor(.4, .4, .4, 1);
    this._gl.enable(this.gl.DEPTH_TEST);

    this.render();
  }

  @Listen(context => context.scenes.current.added$)
  add(entity: Entity) {
    const material = entity.material.constructor;
    const rendererType = Reflect.getMetadata(RENDERABLE_METADATA, entity.geometry.constructor);

    if (!this.renderers.get(material)) this.renderers.set(material, new Map());

    if (!this.renderers.get(material)?.get(rendererType)) {
      const renderer = this.container.resolve<AbstractRenderer>(rendererType);

      this.renderers.get(material)?.set(rendererType, renderer);
    }

    this.renderers.get(material)?.get(rendererType)?.add(entity);
  }

  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.renderers.forEach((renderMap) =>
      renderMap.forEach(renderer => renderer.render()),
    );

    requestAnimationFrame(this.render.bind(this));
  }
}
