import {
  ClassProvider, Container, Inject, INVALID_CAMERA, INVALID_CANVAS, ValueProvider
} from '@engine/core';
import { Renderer } from '../renderer';
import { EventsSystem, InitEvent } from '../events';
import { SceneSystem } from '../scene';
import { ExtensionSystem } from '../extension';
import { ApplicationProps } from './types';

export class Application {
  @Inject() renderer: Renderer;
  @Inject() scenes: SceneSystem;

  private container = new Container();
  @Inject() private events: EventsSystem;

  constructor(private props: ApplicationProps) {
    // register vital parts
    this.container.register(Renderer, new ClassProvider(Renderer));
    this.container.register(EventsSystem, new ClassProvider(EventsSystem));
    this.container.register(ExtensionSystem, new ClassProvider(ExtensionSystem));
    this.container.register(SceneSystem, new ClassProvider(SceneSystem));

    if (props.canvas) {
      this.container.register('canvas', new ValueProvider(props.canvas));
    } else {
      throw new Error(INVALID_CANVAS);
    }

    if (props.camera) {
      this.container.register('camera', new ValueProvider(props.camera));
    } else {
      throw new Error(INVALID_CAMERA);
    }

    // injecting all dependencies
    this.container.inject(this);

    // register event system listeners
    this.events.register(this.renderer);

    this.events.broadcast(InitEvent);
  }
}
