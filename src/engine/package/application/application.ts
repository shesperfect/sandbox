import {
  Renderer, EventsSystem, InitEvent, SceneSystem, BoxRenderer, LineRenderer,
} from '@engine';
import {
  Container,
  Inject,
  ClassProvider,
  FactoryProvider,
  ValueProvider,
  INVALID_CAMERA, INVALID_CANVAS,
  ShaderSystem,
} from '@engine/core';

import { ApplicationProps } from './types';

export class Application {
  @Inject() renderer: Renderer;
  @Inject() scenes: SceneSystem;

  private container = new Container();
  @Inject() private events: EventsSystem;

  constructor(private props: ApplicationProps) {
    // register vital parts
    this.container.register(Renderer, new ValueProvider(new Renderer(this.container)));
    this.container.register(EventsSystem, new ClassProvider(EventsSystem));
    this.container.register(SceneSystem, new ClassProvider(SceneSystem));
    this.container.register(ShaderSystem, new ClassProvider(ShaderSystem));

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

    // register renderers
    this.container.register(BoxRenderer, new FactoryProvider(BoxRenderer));
    // this.container.register(ConeRenderer, new FactoryProvider(ConeRenderer));
    this.container.register(LineRenderer, new FactoryProvider(LineRenderer));

    // injecting application dependencies
    this.container.inject(this);

    // register event system listeners
    this.events.register(this.renderer);

    this.events.broadcast(InitEvent);
  }
}
