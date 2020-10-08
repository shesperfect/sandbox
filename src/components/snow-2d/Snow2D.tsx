import { StandardMaterial, BoxGeometry, Entity } from '@engine';

import { BaseComponent } from 'common';

import './Snow.scss';

const cube = new Entity(new BoxGeometry(), new StandardMaterial());

const centerWall = new Entity(new BoxGeometry(), new StandardMaterial());
centerWall.transform.position.set(1, 0, -1);
centerWall.transform.scale.set(5, 3, .3);

const leftWall = new Entity(new BoxGeometry(), new StandardMaterial());
leftWall.transform.position.set(-1.55, 0, .5);
leftWall.transform.rotation.set(0, Math.PI / 2, 0);
leftWall.transform.scale.set(3, 3, .3);

const floor = new Entity(new BoxGeometry(), new StandardMaterial());
floor.transform.position.set(1, -1.75, 0);
floor.transform.rotation.set(-Math.PI / 2, 0, 0);
floor.transform.scale.set(5, 3, .3);

/**
 * https://www.youtube.com/watch?v=cl-mHFCGzYk&t=1427s
 */
export class Snow2DComponent extends BaseComponent<any, any> {
  protected onRender() {
    // cube.transform.rotation.x += .001;
    // cube.transform.rotation.y += .01;
  }

  protected onInit() {
    this.app.scenes.current.add(cube);
    this.app.scenes.current.add(leftWall);
    this.app.scenes.current.add(centerWall);
    this.app.scenes.current.add(floor);
  }

  protected onResize(canvasWidth: number, canvasHeight: number) {}
}
