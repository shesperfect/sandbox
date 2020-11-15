import { Transformable } from '@engine/core';

export abstract class Geometry extends Transformable {
  protected _vertices: number[] = [];
  protected _normals: number[] = [];

  get vertices(): number[] {
    return this._vertices;
  }

  get normals(): number[] {
    return this._normals;
  }
}
