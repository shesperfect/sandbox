import { Camera } from '@engine';
import { clamp, Vector2 } from '@engine/core';

export interface OrbitControlsOptions {
  keyboard?: boolean,
  speed?: number,
}

const defaultOptions = {
  keyboard: true,
  speed: .02,
};

export class OrbitControls {
  private mousePosition = new Vector2();
  private isDragging = false;

  constructor(canvas: HTMLCanvasElement, camera: Camera, options?: OrbitControlsOptions) {
    const opts = { ...defaultOptions, ...options };

    const position = camera.transform.position;
    const direction = position.clone().subtract(camera.target);
    let radius = direction.length;
    let theta = Math.atan2(position.z, position.x);
    let phi = Math.asin(position.y / radius);

    const zoom = e => {
      e.preventDefault();

      radius += e.deltaY * opts.speed;

      updatePosition();

      e.stopPropagation();
    };
    const dragStart = e => {
      this.isDragging = true;

      this.mousePosition.set(e.offsetX, e.offsetY);

      e.preventDefault();
    };
    const dragMove = e => {
      if (this.isDragging) {
        const deltaX = e.offsetX - this.mousePosition.x;
        const deltaY = e.offsetY - this.mousePosition.y;

        move(deltaX, deltaY);

        this.mousePosition.set(e.offsetX, e.offsetY);

        e.preventDefault();
      }
    };
    const dragEnd = () => {
      this.isDragging = false;
    };
    const move = (deltaXinPX: number, deltaYinPX: number) => {
      const deltaTheta = deltaXinPX * 2 * Math.PI / canvas.width;
      const deltaPhi = deltaYinPX * Math.PI / canvas.height;

      theta = (theta + deltaTheta) % (Math.PI * 2);
      phi = clamp(phi + deltaPhi, -Math.PI / 2, Math.PI / 2);

      updatePosition();
    };
    const updatePosition = () => {
      const x = radius * Math.cos(theta) * Math.cos(phi);
      const y = radius * Math.sin(phi);
      const z = radius * Math.sin(theta) * Math.cos(phi);

      position.set(x, y, z);
    };

    canvas.addEventListener('mousedown', dragStart);
    canvas.addEventListener("wheel", zoom);
    canvas.addEventListener('mousemove', dragMove);
    canvas.addEventListener('mouseup', dragEnd);
    canvas.addEventListener('mouseleave', dragEnd);

    opts.keyboard && document.addEventListener('keydown', e => {
      e.preventDefault();

      switch(e.key) {
        case 'ArrowLeft':
          move(-opts.speed * canvas.width, 0);
          break;
        case 'ArrowRight':
          move(opts.speed * canvas.width, 0);
          break;
        case 'ArrowUp':
          move(0, -opts.speed * canvas.height);
          break;
        case 'ArrowDown':
          move(0, opts.speed * canvas.height);
          break;
      }
    });
  }
}
