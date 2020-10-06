import { VBO } from '../vbo';

export const constants = {
  initial: 1,
  omit: 1,
};

export enum ChangeType { Reallocate, Replace }

export interface Change {
  type: ChangeType;
  from?: number;
  to?: number;
}

export class Changes {
  private history: Change[] = [{ type: ChangeType.Reallocate }];
  private optimized = false;
  private omit = 0;

  getChanges(): Readonly<Change[]> {
    return this.history;
  }

  add(type: ChangeType.Reallocate): this
  add(type: ChangeType.Replace, index: number): this
  add(type: ChangeType, index?: number): this {
    if (this.needReallocate()) return this;

    switch (type) {
      case ChangeType.Reallocate:
        this.history.length = 1;
        this.history[0] = { type: ChangeType.Reallocate };

        this.omit = 0;
        this.optimized = true;

        break;
      case ChangeType.Replace:
        this.history.push({ type: ChangeType.Replace, from: index });

        this.optimized = false;
        break;
    }

    return this;
  }

  optimize(omit: number = 1): this {
    if (this.omit !== omit) this.optimized = false;
    this.omit = omit;

    if (this.needReallocate() || this.optimized) return this;

    if (this.hasChanges()) {
      const groups: Change[] = [];
      let group: { type: ChangeType, from: number, to: number } | null = null;

      const sorted = (this.history as any).sort((a, b) => a.from - b.from);

      for (let i = 0, pointer = -1; i < sorted.length; i++) {
        const change = sorted[i];

        if (change.from > pointer) {
          pointer = change.from;

          if (group) {
            if (change.from - group.to <= omit - 1) {
              group.to = change.from + 1;
              continue;
            } else groups.push(group); // Иначе, сохраняем группу
          }

          group = { type: ChangeType.Replace, from: pointer, to: pointer + 1 };
        }
      }

      if (group) groups.push(group);

      this.history = groups;

      this.optimized = true;
    }

    return this;
  }

  needReallocate() {
    return this.hasChanges() && this.history[0].type === ChangeType.Reallocate;
  }

  isOptimized() {
    return this.optimized;
  }

  hasChanges() {
    return this.history.length > 0;
  }

  reset() {
    this.history.length = 0;
    this.omit = 0;
    this.optimized = true;
    return this;
  }
}

export class DataBuffer {
  protected buffer: Float32Array;
  protected changes: Changes = new Changes();
  protected cursor = -1;

  constructor(readonly reserve: number) {
    this.buffer = new Float32Array(reserve * constants.initial);
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
      this.changes.add(ChangeType.Reallocate);
    } else {
      this.changes.add(ChangeType.Replace, index);
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

  isDirty() {
    return this.changes.hasChanges();
  }

  getChanges(): Readonly<Change[]> {
    return this.changes.optimize(constants.omit).getChanges();
  }

  sync(vbo: VBO, flush = true) {
    if (!this.isDirty()) return;

    const changes = this.getChanges();

    for (let i = 0; i < changes.length; i++) {
      const change = changes[i];

      switch (change.type) {
        case ChangeType.Reallocate:
          vbo.set(this.buffer); return;

        case ChangeType.Replace:
          vbo.insert(
            (change as any).from * this.buffer.BYTES_PER_ELEMENT,
            this.buffer.slice(change.from, change.to),
          );
      }
    }

    if (flush) this.flush();
  }

  flush() {
    this.changes.reset();
  }

  protected reallocate(target: number) {
    const delta = this.reserve - target % this.reserve;
    const amount = target + delta + this.reserve * (delta > this.reserve / 2 ? 1 : 0);
    const buffer = new Float32Array(amount);
    for (let i = 0; i < this.buffer.length; i++) buffer[i] = this.buffer[i];
    this.buffer = buffer;
  }
}

