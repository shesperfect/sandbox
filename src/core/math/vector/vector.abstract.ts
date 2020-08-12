export abstract class AbstractVector {
  protected abstract buffer: Float32Array;

  abstract get length(): number;
}
