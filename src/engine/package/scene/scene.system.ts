import { SCENE_ALREADY_EXISTS, SCENE_DOESNT_EXIST } from '@engine/core';
import { Scene } from './scene';

export class SceneSystem {
  private scenes = new Set<Scene>([new Scene()]);
  private _current: Scene;

  get current(): Scene {
    return this._current || this.scenes.values().next().value;
  }

  add(scene: Scene) {
    if (this.scenes.has(scene)) throw new Error(SCENE_ALREADY_EXISTS);

    this.scenes.add(scene);

    if (this.scenes.size === 0) this._current = scene;
  }

  remove(scene: Scene) {
    if (!this.scenes.has(scene)) throw new Error(SCENE_DOESNT_EXIST);

    this.scenes.delete(scene);
  }

  show(scene: Scene) {}

  hide(scene: Scene) {}
}
