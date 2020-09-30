import { Vector2 } from '@engine/core';
import { Camera } from '../camera';

export interface OrbitControlsOptions {
  keyboard?: boolean,
  speed?: number,
}

const defaultOptions = {
  keyboard: false,
  speed: .1,
};

export class OrbitControls {
  private position = new Vector2();
  private isMoving = false;


  constructor(canvas: HTMLCanvasElement, camera: Camera, options: OrbitControlsOptions) {
    const opts = { ...defaultOptions, ...options };

    const zoom = e => {
      e.preventDefault();

      camera.transform.position.z += e.deltaY * opts.speed;

      e.stopPropagation();
    };
    const dragStart = e => {
      this.isMoving = true;

      this.position.set(e.offsetX, e.offsetY);
    };
    const dragMove = e => {
      if (this.isMoving) {
        const deltaX = e.offsetX - this.position.x;
        const deltaY = e.offsetY - this.position.y;

        move(deltaX, deltaY);
      }
    };
    const dragEnd = e => {
      this.isMoving = false;

      this.position.set(e.offsetX, e.offsetY);

      e.stopPropagation();
    };
    const move = (deltaXinPX: number, deltaYinPX: number) => {
      const deltaX = deltaXinPX;
      const deltaY = deltaYinPX;
      const deltaPhi = deltaY * 2 * Math.PI / 360;
      // const deltaPhi = .1;
      const deltaTheta = deltaX * 2 * Math.PI / 360;
      // const deltaTheta = 0;
      const position = camera.transform.position.clone();
      const direction = camera.transform.position.clone().subtract(camera.target);
      const radius = direction.length;
      console.log(position.toArray());
      const phi = Math.atan2(position.y, position.x) + deltaPhi;
      const theta = Math.acos(direction.z / radius) + deltaTheta;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      // console.log('delta x', deltaX, 'delta y', deltaY);
      // console.log('theta', theta, 'phi', phi);
      // console.log('radius', radius, 'sin theta', Math.sin(theta), 'cos theta', Math.cos(theta), 'sin phi', Math.sin(phi), 'cos phi', Math.cos(phi));
      // console.log(x, y, z);
      // console.log('');

      console.log( Math.atan2(position.y, position.x), Math.sin(phi), Math.cos(phi));

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
