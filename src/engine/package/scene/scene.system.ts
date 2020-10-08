import { Entity } from '@engine/geometries';
import {
  SCENE_ALREADY_ENABLED,
  SCENE_DOESNT_ENABLED,
  SCENE_ALREADY_EXISTS,
  SCENE_DOESNT_EXIST,
  EventEmitter,
} from '@engine/core';
import { Scene } from './scene';

export class SceneSystem {
  added$ = new EventEmitter<{ scene: Scene, entity: Entity }>();

  private _scenes = new Set<Scene>();
  private enabled = new Set<Scene>();

  constructor() {
    const initialScene = new Scene();

    this._scenes.add(initialScene);
    this.enable(initialScene);
  }

  get current(): Set<Scene> {
    return this.enabled;
  }

  add(scene: Scene) {
    if (this._scenes.has(scene)) throw new Error(SCENE_ALREADY_EXISTS);

    this._scenes.add(scene);

    scene.added$.subscribe(entity => this.added$.emit({ scene, entity }));
  }

  remove(scene: Scene) {
    if (!this._scenes.has(scene)) throw new Error(SCENE_DOESNT_EXIST);

    this._scenes.delete(scene);
  }

  enable(scene: Scene) {
    if (this.enabled.has(scene)) throw new Error(SCENE_ALREADY_ENABLED);

    this.enabled.add(scene);
  }

  disable(scene: Scene) {
    if (!this._scenes.has(scene)) throw new Error(SCENE_DOESNT_ENABLED);

    this.enabled.delete(scene);
  }
}
