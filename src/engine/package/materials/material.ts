import { Color } from '@engine/core';

export abstract class Material {
  vertexSource: string;
  fragmentSource: string;
  color = new Color(0, 0, 0);
}
