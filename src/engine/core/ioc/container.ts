import { Token } from '@engine/core';

import { Provider } from './providers';
import { INJECT_METADATA_KEY } from './inject';

import 'reflect-metadata';

export class Container {
  private providers = new Map<Token<any>, Provider<any>>();

  register<T>(token: Token<T>, provider: Provider<T>) {
    this.providers.set(token, provider);
  }

  resolve<T>(token: Token<T>, ...params: any): T {
    const provider = this.providers.get(token);

    if (!provider) throw new Error(`Cannot find a provider for the given token: ${token}`);

    const instance = provider.resolve(params);

    this.inject(instance);

    return instance;
  }

  inject(target: any) {
    const deps = Reflect.getMetadata(INJECT_METADATA_KEY, target) || [];

    if (!deps.length) return;

    deps.forEach(dep => {
      const instance = this.providers.get(dep.token)?.resolve();

      target[dep.propertyKey] = instance;

      this.inject(instance);
    });
  }
}
