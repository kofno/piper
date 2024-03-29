/**
 * A UnaryFunction is a function that takes one argument.
 */
export type UnaryFunction<T, R> = (t: T) => R;

/**
 * noop is a function that does nothing.
 */
export function noop() {}

/**
 * Identity is a function that returns the argument.
 * @param a could be anything
 * @returns a
 */
export function identity<A>(a: A): A {
  return a;
}

/**
 * Always is a function that returns a function that returns the argument.
 * @param a could be anything
 * @returns a function that returns a
 */
export function always<A>(a: A): (x?: unknown) => A {
  return (_) => a;
}

/**
 * assertNever is a function that throws an error if it is ever called.
 * It is used to make sure that a switch statement is exhaustive.
 * @param x
 */
export function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}

/**
 * pipe is a function that takes a list of functions and returns a function
 * that is the composition of those functions.
 *
 * Example:
 * ```ts
 * const manipulateString = pipe(
 *  upper,
 *  split(''),
 *  reverse,
 *  join
 * );
 * manipulateString('food') // => 'DOOF'
 * ```
 *
 * @param fns a list of functions
 * @returns a function that is the composition of those functions
 */
export function pipe<T>(): UnaryFunction<T, T>;
export function pipe<T, A>(fn1: UnaryFunction<T, A>): UnaryFunction<T, A>;
export function pipe<T, A, B>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>
): UnaryFunction<T, B>;
export function pipe<T, A, B, C>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>
): UnaryFunction<T, C>;
export function pipe<T, A, B, C, D>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
  fn4: UnaryFunction<C, D>
): UnaryFunction<T, D>;
export function pipe<T, A, B, C, D, E>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
  fn4: UnaryFunction<C, D>,
  fn5: UnaryFunction<D, E>
): UnaryFunction<T, E>;
export function pipe<T, A, B, C, D, E, F>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
  fn4: UnaryFunction<C, D>,
  fn5: UnaryFunction<D, E>,
  fn6: UnaryFunction<E, F>
): UnaryFunction<T, F>;
export function pipe<T, A, B, C, D, E, F, G>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
  fn4: UnaryFunction<C, D>,
  fn5: UnaryFunction<D, E>,
  fn6: UnaryFunction<E, F>,
  fn7: UnaryFunction<F, G>
): UnaryFunction<T, G>;
export function pipe<T, A, B, C, D, E, F, G, H>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
  fn4: UnaryFunction<C, D>,
  fn5: UnaryFunction<D, E>,
  fn6: UnaryFunction<E, F>,
  fn7: UnaryFunction<F, G>,
  fn8: UnaryFunction<G, H>
): UnaryFunction<T, H>;
export function pipe<T, R>(...fns: UnaryFunction<T, R>[]): UnaryFunction<T, R> {
  if (!fns) {
    return identity as UnaryFunction<T, R>;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return (t: T): R => {
    // deno-lint-ignore no-explicit-any
    return fns.reduce((prev, fn) => fn(prev), t as any);
  };
}

/**
 * Pipeline is a class that takes a function and allows you to map over it.
 * The map function returns a new Pipeline.
 * This can be used to compose functions in a more readable way or to compose
 * function in a loop.
 *
 * Example:
 * ```ts
 * const manipulateString = pipeline(upper)
 *   .map(split(''))
 *   .map(reverse)
 *   .map(join).fn;
 * manipulateString('food') // => 'DOOF'
 * ```
 */
export class Pipeline<A, B> {
  constructor(public fn: UnaryFunction<A, B>) {}

  /**
   * map takes a function and returns a new Pipeline.
   * @param callback
   * @returns
   */
  public map<C>(callback: UnaryFunction<B, C>): Pipeline<A, C> {
    return new Pipeline((a: A) => {
      const internalValue = this.fn(a);
      return callback(internalValue);
    });
  }
}

/**
 * pipeline is a function that takes a function and returns a Pipeline.
 * @param fn any unary function
 * @returns
 */
export function pipeline<A, B>(fn: UnaryFunction<A, B>): Pipeline<A, B> {
  return new Pipeline(fn);
}

/**
 * pick is a function that takes a key and an object and returns the value at
 * that key.
 *
 * Example:
 * ```ts
 * const obj = { foo: 'bar', baz: 1 };
 * pick('foo', obj) // => 'bar'
 * ```
 *
 * pick can also be used with pipe to create a function that picks a nested
 * value.
 *
 * Example:
 * ```ts
 * const obj = { foo: { bar: 'baz', qux: 1 } };
 * const foobar = pipe(pick<typeof obj, 'foo'>('foo'), pick('bar'));
 * foobar(obj) // => 'baz'
 * ```
 *
 * @param key a key
 * @param obj an object
 * @returns the value at that key
 */
export function pick<Type, K extends keyof Type>(key: K, obj: Type): Type[K];
export function pick<Type, K extends keyof Type>(key: K): (obj: Type) => Type[K];
export function pick<T>(key: keyof T, obj?: T) {
  const doit = (obj: T) => obj[key];

  return typeof obj === 'undefined' ? doit : doit(obj);
}
