import { Color } from '@engine/core';

export interface MaterialOptions {
  color: Color,
}

export abstract class Material {
  vertexSource: string;
  fragmentSource: string;
  color = new Color(255, 255, 255);

  protected _id: number;

  get id(): number { return this._id; }
}
