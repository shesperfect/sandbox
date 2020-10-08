import { Color } from '@engine/core';

export abstract class Material {
  protected _id: number;

  get id(): number { return this._id; }

  vertexSource: string;
  fragmentSource: string;
  color = new Color(255, 255, 255);
}
