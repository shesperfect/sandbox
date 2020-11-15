import { Camera } from '@engine';
import { Vector2 } from '@engine/core';

export interface OrbitControlsOptions {
  keyboard?: boolean,
  speed?: number,
}

const defaultOptions = {
  keyboard: true,
  speed: .1,
};

export class OrbitControls {
  private position = new Vector2();
  private isMoving = false;

  constructor(canvas: HTMLCanvasElement, camera: Camera, options?: OrbitControlsOptions) {
    const opts = { ...defaultOptions, ...options };

    const position = camera.transform.position.clone();
    const direction = camera.transform.position.clone().subtract(camera.target);
    const radius = direction.length;

    let theta = Math.acos(direction.z / radius);
    let phi = Math.atan2(position.y, position.x);

    const zoom = e => {
      e.preventDefault();

      camera.transform.position.z += e.deltaY * opts.speed;

      e.stopPropagation();
    };
    const dragStart = e => {
      this.isMoving = true;

      this.position.set(e.offsetX, e.offsetY);

      e.preventDefault();
    };
    const dragMove = e => {
      if (this.isMoving) {
        const deltaX = e.offsetX - this.position.x;
        const deltaY = e.offsetY - this.position.y;

        move(deltaX, deltaY);

        this.position.set(e.offsetX, e.offsetY);

        e.preventDefault();
      }
    };
    const dragEnd = () => {
      this.isMoving = false;
    };
    const move = (deltaXinPX: number, deltaYinPX: number) => {
      const deltaX = deltaXinPX * 2 * Math.PI / canvas.width;
      const deltaY = deltaYinPX * 2 * Math.PI / canvas.height;
      theta -= deltaX;
      phi += deltaY;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      camera.transform.position.set(x, y, z);
      camera.lookAt();
    };

    canvas.addEventListener('mousedown', dragStart);
    canvas.addEventListener("wheel", zoom);
    canvas.addEventListener('mousemove', dragMove);
    canvas.addEventListener('mouseup', dragEnd);
    canvas.addEventListener('mouseleave', dragEnd);

    opts.keyboard && document.addEventListener('keydown', e => {
      e.preventDefault();

      const { x, y, z } = camera.transform.position;

      switch(e.key) {
        case 'ArrowLeft':
          camera.transform.position.x = x * Math.cos(opts.speed) + z * Math.sin(opts.speed);
          camera.transform.position.z = z * Math.cos(opts.speed) - x * Math.sin(opts.speed);
          break;
        case 'ArrowRight':
          camera.transform.position.x = x * Math.cos(opts.speed) - z * Math.sin(opts.speed);
          camera.transform.position.z = z * Math.cos(opts.speed) + x * Math.sin(opts.speed);
          break;
        case 'ArrowUp':
          camera.transform.position.y = y * Math.cos(opts.speed) + z * Math.sin(opts.speed);
          camera.transform.position.z = z * Math.cos(opts.speed) - y * Math.sin(opts.speed);
          break;
        case 'ArrowDown':
          camera.transform.position.y = y * Math.cos(opts.speed) - z * Math.sin(opts.speed);
          camera.transform.position.z = z * Math.cos(opts.speed) + y * Math.sin(opts.speed);
          break;
      }

      camera.lookAt();
    });
  }
}
