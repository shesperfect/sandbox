export const VALIDATION_ERROR = new Error('Validation error');

export type Predicate = (...args: any[]) => any;

export function Validate(predicate: Predicate, error: Error) {
  return (target: any, key: string, descriptor) => {
    const method = descriptor.value ?? descriptor.set;

    descriptor[descriptor.value ? 'value' : 'set'] = function(...args) {
      const result = predicate(...args);

      if (result) {
        if (result instanceof Error) throw result;

        return method.apply(this, args);
      } else {
        throw error ?? VALIDATION_ERROR;
      }
    };

    return descriptor;
  };
}
