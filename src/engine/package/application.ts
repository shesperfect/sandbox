import { ClassProvider, Container, Inject, ValueProvider } from '@engine/core';
import { Renderer } from './renderer';
import { Camera } from './camera';
import { Scene } from './scene';
import { Entity } from './geometries';
import { ExtensionSystem } from './extension';

export class Application {
  @Inject() extensions: ExtensionSystem;

  @Inject() private renderer: Renderer;

  private container = new Container();
  private readonly gl: WebGLRenderingContext;

  constructor(private _canvas: HTMLCanvasElement) {
    const gl = _canvas.getContext('webgl');

    if (!gl) {
      throw new Error('Your browser doesn\'t support webgl');
    }

    this.gl = gl;

    // register vital parts
    this.container.register(Renderer, new ClassProvider(Renderer));
    this.container.register(ExtensionSystem, new ClassProvider(ExtensionSystem));
    this.container.register('context', new ValueProvider(gl));

    // injecting all dependencies
    this.container.inject(this);
  }

  get context(): WebGLRenderingContext {
    return this.gl;
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  render(camera: Camera, scene: Scene) {
    scene.entities.forEach((entity: Entity) => {
      entity.render();
    });
  }
}
