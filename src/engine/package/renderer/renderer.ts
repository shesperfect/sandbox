import {
  Container,EventEmitter,
  Inject,
  NO_WEBGL,
  ShaderProgram,
  ShaderSystem
} from '@engine/core';

import { Scene, SceneSystem } from '@engine/scene';
import { Camera } from '@engine/camera';
import { InitEvent, Listen } from '@engine/events';
import { ExtensionSystem } from '@engine/extension';

import { AbstractRenderer } from './abstract.renderer';
import { RENDERABLE_METADATA } from './renderable.decorator';

export class Renderer {
  ready$ = new EventEmitter();
  rendered$ = new EventEmitter();

  extensions: ExtensionSystem;

  @Inject() private scenes: SceneSystem;
  @Inject() private shader: ShaderSystem;
  @Inject('camera') private camera: Camera;
  @Inject('canvas') private canvas: HTMLCanvasElement;

  private _gl: WebGLRenderingContext;
  private register = new Map<Scene, Map<ShaderProgram, AbstractRenderer>>();

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
    this._gl.enable(this.gl.DEPTH_TEST);

    this.extensions = new ExtensionSystem(gl);

    this.ready$.emit();

    this.render();
  }

  @Listen(context => context.scenes.added$)
  add({ scene, entity }) {
    const rendererType = Reflect.getMetadata(RENDERABLE_METADATA, entity.geometry.constructor);
    const shader = this.shader.get(entity.material, this._gl);

    if (!this.register.has(scene)) this.register.set(scene, new Map());

    if (!this.register.get(scene)?.has(shader)) {
      const renderer = this.container.resolve<AbstractRenderer>(rendererType, shader);

      this.register.get(scene)?.set(shader, renderer);
    }

    this.register.get(scene)?.get(shader)?.add(entity);
  }

  render() {
    this.scenes.current.forEach(scene => {
      scene.prepare(this.gl, this.camera);

      this.register.get(scene)?.forEach((renderer: AbstractRenderer, shader: ShaderProgram) => {
        shader.link();
        renderer.render();
      });
    });

    this.rendered$.emit();

    requestAnimationFrame(this.render.bind(this));
  }
}
