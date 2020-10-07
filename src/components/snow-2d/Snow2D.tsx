import { StandardMaterial, BoxGeometry, Entity } from '@engine';

import { BaseComponent } from 'common';

import './Snow.scss';

const cube1 = new Entity(new BoxGeometry(), new StandardMaterial());

/**
 * https://www.youtube.com/watch?v=cl-mHFCGzYk&t=1427s
 */
export class Snow2DComponent extends BaseComponent<any, any> {
  protected onRender() {
    cube1.transform.rotation.x += .001;
    cube1.transform.rotation.y += .01;
  }

  protected onInit() {
    this.app.scenes.current.add(cube1);
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {}
}
