export class Subscription {
  private observers: Set<Function> = new Set();
  private children: Set<Subscription> = new Set();

  constructor(private disposer?: Function) {}

  add(...args: (Subscription | Function)[]) {

    args.forEach(arg => {
      if (arg instanceof Subscription) {
        this.children.add(arg);
      } else {
        this.observers.add(arg)
      }
    });
  }

  execute(data: any) {
    this.observers.forEach(callback => callback(data));
  }

  unsubscribe() {
    this.children.forEach(sub => sub.unsubscribe());
    this.children.clear();
    this.disposer && this.disposer();
  }
}
