import { ClassProvider, Container, Inject } from '@core/ioc';
import { Renderer } from '@core/renderer';

export class Application {
  private container = new Container();
  @Inject() renderer: Renderer

  constructor() {
    this.container.register(Renderer, new ClassProvider<any>());
    console.log(this);
  }
}
