import {
  Scene, Entity, LineGeometry, BasicMaterial,
} from '@engine';
import { Color } from '@engine/core';

import { BaseComponent } from 'common';

import './Snow.scss';

const line = new Entity(new LineGeometry(), new BasicMaterial());

const scene1 = new Scene({
  clearColor: new Color(125, 130, 130, 1)
});

/**
 * https://www.youtube.com/watch?v=cl-mHFCGzYk&t=1427s
 */
export class Snow2DComponent extends BaseComponent<any, any> {
  protected onRender() {}

  protected onInit() {
    this.app.scenes.add(scene1);
    this.app.scenes.enable(scene1);

    scene1.add(line);
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {}
}
