import { StandardMaterial, BoxGeometry, Entity, Scene } from '@engine';
import { Color } from '@engine/core';

import { BaseComponent } from 'common';

import './Snow.scss';

const cube = new Entity(new BoxGeometry(), new StandardMaterial());
const smallCube = new Entity(new BoxGeometry(), new StandardMaterial());
smallCube.transform.scale.set(.5, .5, .5);

const centerWall = new Entity(new BoxGeometry(), new StandardMaterial());
centerWall.transform.position.set(1, 0, -1);
centerWall.transform.scale.set(5, 3, .3);

const leftWall = new Entity(new BoxGeometry(), new StandardMaterial());
leftWall.transform.position.set(-1.55, 0, .5);
leftWall.transform.rotation.set(0, Math.PI / 2, 0);
leftWall.transform.scale.set(3, 3, .3);

const floor = new Entity(new BoxGeometry(), new StandardMaterial());
floor.transform.position.set(1, -1.6, 0);
floor.transform.rotation.set(-Math.PI / 2, 0, 0);
floor.transform.scale.set(5, 3, .3);

const scene1 = new Scene({
  clearColor: new Color(30, 30, 30, 1)
});
scene1.transform.scale.x = .5;

const scene2 = new Scene({
  clearColor: new Color(89, 89, 89, 1),
});
scene2.transform.scale.x =.5;

/**
 * https://www.youtube.com/watch?v=cl-mHFCGzYk&t=1427s
 */
export class Snow2DComponent extends BaseComponent<any, any> {
  protected onRender() {
    cube.transform.rotation.x += .001;
    cube.transform.rotation.y += .01;
  }

  protected onInit() {
    this.app.scenes.add(scene1);
    this.app.scenes.enable(scene1);

    this.app.scenes.add(scene2);
    this.app.scenes.enable(scene2);

    scene1.add(cube);
    scene1.add(leftWall);
    scene1.add(centerWall);
    scene1.add(floor);

    scene2.add(smallCube);
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {
    scene2.transform.position.x = canvasWidth / 2;
  }
}
