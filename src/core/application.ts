import { ClassProvider, Container, Inject } from '@core/ioc';
import { Renderer } from '@core/renderer';

export class Application {
  @Inject() renderer: Renderer;

  private container = new Container();

  start() {
    this.container.register(Renderer, new ClassProvider(Renderer));

    this.container.inject(this);
  }
}
