import { Entity } from '@engine';
import { EventEmitter } from '@engine/core';

export class Scene {
  added$ = new EventEmitter();

  // private _tree = new Map<Material, Set<Entity>>();

  add(entity: Entity) {
    // const material = entity.material.constructor;

    // if (!this._tree.get(material)) this._tree.set(material, new Set());
    //
    // if (this._tree.get(material)?.has(entity)) throw new Error(ENTITY_ALREADY_EXISTS);
    //
    // this._tree.get(material)?.add(entity);

    this.added$.emit(entity);
  }

  remove(entity: Entity) {}

  hide(entity: Entity) {}

  show(entity: Entity) {}
}
