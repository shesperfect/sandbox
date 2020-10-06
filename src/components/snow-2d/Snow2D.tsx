import { StandardMaterial, BoxGeometry, Entity } from '@engine';

import { BaseComponent } from 'common';

import './Snow.scss';

const cube = new Entity(new BoxGeometry(), new StandardMaterial());

/**
 * https://www.youtube.com/watch?v=cl-mHFCGzYk&t=1427s
 */
export class Snow2DComponent extends BaseComponent<any, any> {
  protected onRender() {
    cube.transform.rotation.x += .2;
    cube.transform.rotation.y += .1;
  }

  protected onInit() {
    this.app.scenes.current.add(cube);
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {}
}
