import { Camera, OrbitControls } from '@engine';

export interface ApplicationProps {
  controls?: OrbitControls | null,
  canvas: HTMLCanvasElement,
  camera: Camera,
}
