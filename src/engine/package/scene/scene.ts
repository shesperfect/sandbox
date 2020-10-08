import { Camera, Entity } from '@engine';
import { Color, EventEmitter, Transformable } from '@engine/core';

interface SceneProps {
  clearColor?: Color;
}

export class Scene extends Transformable {
  added$ = new EventEmitter();

  // private _tree = new Map<Material, Set<Entity>>();

  constructor(private props?: SceneProps) {
    super();
  }

  prepare(gl: WebGLRenderingContext, camera: Camera) {
    let x = this.transform.position.x;
    let y = this.transform.position.y;
    let width = this.transform.scale.x * gl.canvas.width;
    let height = this.transform.scale.y * gl.canvas.height;

    gl.viewport(x, y, width, height);
    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(x, y, width, height);

    if (this.props?.clearColor) {
      const color = this.props?.clearColor;

      gl.clearColor(color.red, color.green, color.blue, color.alpha);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    (camera as any).aspectRatio = width / height;
  }

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
