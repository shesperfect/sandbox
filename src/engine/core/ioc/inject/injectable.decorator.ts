// import { Type } from '@engine/core';
//
// import { INJECTABLE_METADATA_KEY } from './const';

import 'reflect-metadata';
/**
 * This class decorator adds a boolean property to the class
 * metadata, marking it as 'injectable'.
 */
export function Injectable() {
  return function(constructor: any) {
    // const proxyHandler = {
    //   construct(target: any, args: any[], newTarget: any) {
    //     const obj = Reflect.construct(target, args, newTarget);
    //
    //     try {
    //       const deps = Reflect.getMetadata(INJECT_METADATA_KEY, constructor);
    //       for (const dependency of deps) {
    //         const dependencyId = dependency.token;
    //
    //         // Creates a new dependency instance or reuses the existing one.
    //         const singleton = instantiateSingleton(dependencyId);
    //         if (!singleton) {
    //           throw new Error("Failed to instantiate singleton " + dependencyId);
    //         }
    //
    //         const propertyName = dependency.propertyKey;
    //
    //         obj[propertyName] = singleton;
    //       }
    //     }
    //     catch (err) {
    //       throw err;
    //     }
    //
    //     return obj;
    //   }
    // };
    //
    // // Wrap the original constructor in a proxy.
    // // Use the proxy to inject dependencies.
    // // Returns the proxy constructor to use in place of the original constructor.
    // return new Proxy(constructor, proxyHandler);
    return constructor;
  };
}

// export function InjectableSingleton(dependencyId: string): Function {
//   // Returns a factory function that records the constructor of the class so that
//   // it can be lazily created later as a singleton when required as a dependency.
//   return (target: Function): void => {
//     // Adds the singleton constructor to the set of singletons.
//     singletonConstructors.set(dependencyId, target);
//   }
// }

/**
 * Provide an easy way to query whether a class is
 * injectable. Our container will reject classes which aren't
 * marked as injectable.
 * @param { Type<T> } target - target class constructor
 */
// export function isInjectable<T>(target: Type<T>): boolean {
//   return !!Reflect.getMetadata(INJECTABLE_METADATA_KEY, target);
// }
