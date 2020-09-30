import { Type } from '@engine/core';
import { Entity } from '../geometries';
import { AbstractRenderer } from '../renderer';
import { Material } from '../materials';

export class Scene {
  private tree = new Map<Material, Type<AbstractRenderer>>();

  add(entity: Entity) {}

  remove(entity: Entity) {}

  hide(entity: Entity) {}

  show(entity: Entity) {}
}
