import { Token } from '@core';
import { Provider } from './providers';

export class Container {
  private providers = new Map<Token<any>, Provider<any>>();

  register<T>(token: Token<T>, provider: Provider<T>) {
    this.providers.set(token, provider);
  }

  resolve<T>(token: Token<T>): T {
    const provider = this.providers.get(token);

    if (!provider) throw new Error(`Cannot find a provider for given token: ${token}`);

    return this.providers.get(token)?.resolve();
  }



























  // addProvider<T>(provider: Provider<T>) {
  //   this.assertInjectableIfClassProvider(provider);
  //   this.providers.set(provider.provide, provider);
  // }
  //
  // inject<T>(type: Token<T>): T {
  //   let provider = this.providers.get(type);
  //   return this.injectWithProvider(type, provider);
  // }
  //
  //
  //
  // private assertInjectableIfClassProvider<T>(provider: Provider<T>) {
  //   if (isClassProvider(provider) && !isInjectable((provider as ClassProvider<any>).useClass)) {
  //     throw new Error(
  //       `Cannot provide ${this.getTokenName(provider.provide)} using class ${this.getTokenName(
  //         (provider as ClassProvider<any>).useClass
  //       )}, ${this.getTokenName((provider as ClassProvider<any>).useClass)} isn't injectable`
  //     );
  //   }
  // }
  //
  // /**
  //  * Returns a printable name for the token
  //  */
  // private getTokenName<T>(token: Token<T>) {
  //   return token.name;
  // }
  //
  // private injectWithProvider<T>(type: Token<T>, provider?: Provider<T>): T {
  //   if (provider === undefined) {
  //     throw new Error(`No provider for type ${this.getTokenName(type)}`);
  //   }
  //   if (isClassProvider(provider)) {
  //     return this.injectClass(provider as ClassProvider<T>);
  //   } else if (isValueProvider(provider)) {
  //     return this.injectValue(provider as ValueProvider<T>);
  //   } else {
  //     return this.injectFactory(provider as FactoryProvider<T>);
  //   }
  // }
  //
  // private injectValue<T>(valueProvider: ValueProvider<T>): T {
  //   return valueProvider.useValue;
  // }
  //
  // private injectFactory<T>(valueProvider: FactoryProvider<T>): T {
  //   return valueProvider.useFactory();
  // }
  //
  // private injectClass<T>(classProvider: ClassProvider<T>): T {
  //   const target = classProvider.useClass;
  //   const params = this.getInjectedParams(target);
  //
  //   return Reflect.construct(target, params);
  // }
  //
  // private getInjectedParams<T>(target: Type<T>) {
  //   const argTypes = []; //Reflect.getMetadata(REFLECT_PARAMS, target) as (InjectableParam | undefined)[];
  //   if (argTypes === undefined) {
  //     return [];
  //   }
  //   return argTypes.map((argType, index) => {
  //     // The reflect-metadata API fails on circular dependencies,
  //     // and will return undefined for the argument instead.
  //     // We could handle this better, but for now let's just throw an error.
  //     if (argType === undefined) {
  //       throw new Error(
  //         `Injection error. Recursive dependency detected in constructor for type ${
  //           target.name
  //         } with parameter at index ${index}`
  //       );
  //     }
  //     // Check if a 'Inject(INJECTION_TOKEN)' was added to the parameter.
  //     // This always takes priority over the parameter type.
  //     const overrideToken = getInjectionToken(target, index);
  //     const actualToken = overrideToken === undefined ? argType : overrideToken;
  //     let provider = this.providers.get(actualToken);
  //     return this.injectWithProvider(actualToken, provider);
  //   });
  // }
}

// export function isClassProvider<T>(provider: BaseProvider<T>): boolean {
//   return (provider as any).useClass !== undefined;
// }
// export function isValueProvider<T>(provider: BaseProvider<T>): boolean {
//   return (provider as any).useValue !== undefined;
// }
// export function isFactoryProvider<T>(provider: BaseProvider<T>): boolean {
//   return (provider as any).useFactory !== undefined;
// }
