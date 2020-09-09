import { Entity } from '../geometries';

export class Scene {
  // entities = new Map<Type<AbstractRenderer>, Set<Geometry>>();
  entities = new Set<Entity>();

  add(entity: Entity) {
    // const renderer = Reflect.getMetadata(RENDERABLE_METADATA, entity.constructor);
    //
    // if (!renderer) throw new Error(`Cannot find renderer for the given entity: ${entity.constructor.name}`);
    //
    // if (!this.entities.get(renderer)) this.entities.set(renderer, new Set());
    //
    // this.entities.get(renderer)?.add(entity);

    if (this.entities.has(entity)) throw new Error(`The entity you are trying to add is already added to the scene: ${entity.constructor.name}`);

    this.entities.add(entity);
  }

  remove(entity: Entity) {
    // const renderer = Reflect.getMetadata(RENDERABLE_METADATA, geometry.constructor);
    //
    // if (!this.entities.get(renderer)) return;
    //
    // this.entities.get(renderer)?.delete(geometry);

    if (!this.entities.has(entity)) throw new Error(`The entity you are trying to delete doesn't exist: ${entity.constructor.name}`);

    this.entities.delete(entity);
  }
}
