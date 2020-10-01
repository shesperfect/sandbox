import { Type } from '@engine/core';

import { Entity } from '../geometries';
import { AbstractRenderer, RENDERABLE_METADATA } from '../renderer';
import { Material } from '../materials';

import 'reflect-metadata';

export class Scene {
  private _tree = new Map<Material, Map<Type<AbstractRenderer>, AbstractRenderer>>();

  get tree() { return this._tree; }

  add(entity: Entity) {
    const material = entity.material.constructor;
    const rendererType = Reflect.getMetadata(RENDERABLE_METADATA, entity.geometry.constructor);

    if (!this._tree.get(material)) this._tree.set(material, new Map());

    if (!this._tree.get(material)?.get(rendererType)) {
      const renderer = new rendererType(); // TODO: How??

      this._tree.get(material)?.set(rendererType, renderer);
    }

    this._tree.get(material)?.[rendererType].add(entity);
  }

  remove(entity: Entity) {}

  hide(entity: Entity) {}

  show(entity: Entity) {}
}
