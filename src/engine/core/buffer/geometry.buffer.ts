import { DataBuffer } from './data.buffer';

export class GeometryBuffer extends DataBuffer {
  private vacancies: number[] = [];
  private pointer = 0;

  constructor(public epi: number, private readonly vertices: number[] = []) {
    super(1);

    this.add(vertices);
  }

  add(...args: Array<number | number[] | Float32Array>): number {
    const pointer = this.vacancies.shift() ?? this.length;

    this.pointer = pointer;
    this.fill(args);

    return pointer;
  }

  fill(data: Array<number | number[] | Float32Array>) {
    for (let i = 0; i < data.length; i++) {
      (data[i] as any).length
        ? this.fill(data[i] as any)
        : this.set(this.pointer++, data[i] as number);
    }
  }

  get count(): number {
    return (this.length - this.vertices.length) / this.epi;
  }

  free(index: number) {
    this.vacancies.unshift(index);
  }
}
