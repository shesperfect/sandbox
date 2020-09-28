export class Subscription {
  private children: Set<Subscription>;

  constructor(private disposer?: Function) {}

  add(...subs: Subscription[]) {
    if (!this.children) this.children = new Set<Subscription>();

    subs.forEach(sub => this.children.add(sub));
  }

  unsubscribe() {
    this.children.forEach(sub => sub.unsubscribe());
    this.children.clear();
    this.disposer && this.disposer();
  }
}
