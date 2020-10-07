import { Geometry, Material } from '@engine';
import { EventEmitter, Transformable } from '@engine/core';

export class Entity extends Transformable {
  bufferIndex: number;
  updated$ = new EventEmitter<Entity>();

  constructor(protected _geometry: Geometry, protected _material: Material) {
    super();

    this.transform.changed$.subscribe(() => this.updated$.emit());
  }

  get material(): Material { return this._material; }

  get geometry(): Geometry { return this._geometry; }
}
