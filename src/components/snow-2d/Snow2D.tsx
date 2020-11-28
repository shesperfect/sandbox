import { BoxGeometry, Entity, Scene, StandardMaterial } from '@engine';
import { Color } from '@engine/core';

import { BaseComponent } from 'common';

import './Snow.scss';

const scene = new Scene({
  clearColor: new Color(125, 130, 130, 1)
});

const cube = new Entity(new BoxGeometry(), new StandardMaterial());

/**
 * https://www.youtube.com/watch?v=cl-mHFCGzYk&t=1427s
 */
export class Snow2DComponent extends BaseComponent<any, any> {
  protected onRender() {}

  protected onInit() {
    this.app.scenes.add(scene);
    this.app.scenes.enable(scene);

    scene.add(cube);
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {}
}
