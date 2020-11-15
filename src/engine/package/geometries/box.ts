import { Renderable, BoxRenderer } from '@engine/renderer';

import { Geometry } from './geometry';

@Renderable(BoxRenderer)
export class BoxGeometry extends Geometry {}
