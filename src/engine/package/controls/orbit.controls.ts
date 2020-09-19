import { Vector2 } from '@engine/core';
import { Camera } from '../camera';

export interface OrbitControlsOptions {
  keyboard?: boolean,
  delta?: number,
}

const defaultOptions = {
  keyboard: false,
  delta: .1,
};

export class OrbitControls {
  private position = new Vector2();
  private isMoving = false;


  constructor(canvas: HTMLCanvasElement, camera: Camera, options: OrbitControlsOptions) {
    const opts = { ...defaultOptions, ...options };

    canvas.addEventListener('mousedown', e => {
      this.isMoving = true;

      this.position.set(e.offsetX, e.offsetY);
    });

    canvas.addEventListener("wheel", e => {
      e.preventDefault();

      camera.position.z -= e.deltaY * opts.delta;

      e.stopPropagation();
    });

    canvas.addEventListener('mousemove', e => {
      if (this.isMoving) {
        camera.position.x += (e.offsetX - this.position.x) * opts.delta / 100;
        camera.position.y -= (e.offsetY - this.position.y) * opts.delta / 100;
      }
    });

    canvas.addEventListener('mouseup', e => {
      this.isMoving = false;

      e.stopPropagation();
    });

    opts.keyboard && document.addEventListener('keydown', e => {
      switch(e.key) {
        case 'ArrowLeft':
          camera.position.x -= 10 * opts.delta;
          break;
        case 'ArrowRight':
          camera.position.x += 10 * opts.delta;
          break;
        case 'ArrowUp':
          camera.position.y -= 10 * opts.delta;
          break;
        case 'ArrowDown':
          camera.position.y += 10 * opts.delta;
          break;
      }
    });
  }
}
