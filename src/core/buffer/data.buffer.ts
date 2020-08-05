import { VBO } from '@core';

export class DataBuffer {
  protected buffer: Float32Array;
  protected cursor = -1;

  constructor(readonly reserve: number) {
    this.buffer = new Float32Array(reserve);
  }

  get length() {
    return this.cursor + 1;
  }

  get size() {
    return this.buffer.length;
  }

  set(index: number, value: number) {
    if (index < 0) throw new Error('Index must be greater than zero!');
    if (this.buffer.length <= index) {
      this.reallocate(index);
    }
    this.buffer[index] = value;
    this.cursor = Math.max(this.cursor, index);
  }

  get(index: number) {
    return this.buffer[index];
  }

  isEmpty() {
    return this.length <= 0;
  }

  // sync(vbo: VBO, flush = true) {
  //   const changes = this.getChanges();
  //
  //   for (let i = 0; i < changes.length; i++) {
  //     const change = changes[i];
  //
  //     switch (change.type) {
  //       case ChangeType.Reallocate:
  //         vbo.set(this.buffer); return;
  //
  //       case ChangeType.Replace:
  //         vbo.insert(
  //           change.from * this.buffer.BYTES_PER_ELEMENT,
  //           this.buffer.slice(change.from, change.to),
  //         );
  //     }
  //   }
  // }

  protected reallocate(overflowIndex: number) {
    const delta = this.reserve - overflowIndex % this.reserve;
    const amount = overflowIndex + delta + this.reserve * (delta > this.reserve / 2 ? 1 : 0);
    const buffer = new Float32Array(amount);
    for (let i = 0; i < this.buffer.length; i++) buffer[i] = this.buffer[i];
    this.buffer = buffer;
  }
}

