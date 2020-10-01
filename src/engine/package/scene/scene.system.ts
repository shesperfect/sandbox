import { SCENE_ALREADY_EXISTS, SCENE_DOESNT_EXIST } from '@engine/core';
import { Scene } from './scene';

export class SceneSystem {
  private scenes = new Set<Scene>();
  private _current: Scene;

  get current(): Scene {
    return this._current || this.scenes[0];
  }

  add(scene: Scene) {
    if (this.scenes.has(scene)) throw new Error(SCENE_ALREADY_EXISTS);

    this.scenes.add(scene);
  }

  remove(scene: Scene) {
    if (!this.scenes.has(scene)) throw new Error(SCENE_DOESNT_EXIST);

    this.scenes.delete(scene);
  }

  show(scene: Scene) {}

  hide(scene: Scene) {}
}
