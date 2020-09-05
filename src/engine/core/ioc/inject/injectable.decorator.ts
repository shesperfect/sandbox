import { Type } from '@engine/core';

import { INJECT_METADATA_KEY, INJECTABLE_METADATA_KEY } from './const';

import 'reflect-metadata';

const singletonConstructors = new Map<string, Function>();

//
// Collection of all singletons objects that can be injected.
//
const instantiatedSingletons = new Map<string, any>();

// export function instantiateSingleton<T = any>(dependencyId: string): T {
//   try {
//     const existingSingleton = instantiatedSingletons.get(dependencyId);
//     if (existingSingleton) {
//       // The singleton has previously been instantiated.
//       return existingSingleton;
//     }
//
//     const singletonConstructor = singletonConstructors.get(dependencyId);
//     if (!singletonConstructor) {
//       // The requested constructor was not found.
//       const msg = "No constructor found for singleton " + dependencyId;
//       throw new Error(msg);
//     }
//
//     // Construct the singleton.
//     const instantiatedSingleton =
//       Reflect.construct(makeConstructorInjectable(singletonConstructor), []); // recursion
//
//
//     instantiatedSingletons.set(dependencyId, instantiatedSingleton);
//     return instantiatedSingleton;
//   }
//   catch (err) {
//     console.error("Failed to instantiate singleton " + dependencyId);
//     console.error(err && err.stack || err);
//     throw err;
//   }
// }

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
export function isInjectable<T>(target: Type<T>): boolean {
  return !!Reflect.getMetadata(INJECTABLE_METADATA_KEY, target);
}
