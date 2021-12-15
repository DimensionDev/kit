export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function withTimeout<T>(promise: PromiseLike<T>, ms: number, defaultValue: T): Promise<T>;
export function withTimeout<T>(promise: PromiseLike<T>, ms: number, error: Error): Promise<T>;
export function withTimeout<T>(promise: PromiseLike<T>, ms: number, defaultValue?: T) {
  let id: number | undefined;
  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      if (defaultValue instanceof Error) {
        id = setTimeout(reject, ms, defaultValue);
      } else {
        id = setTimeout(resolve, ms, defaultValue);
      }
    }),
  ]).finally(() => {
    clearTimeout(id);
  });
}
/**
 * !!!! Please use the Promise constructor if possible
 * If you don't understand https://groups.google.com/forum/#!topic/bluebird-js/mUiX2-vXW2s
 */
export function defer<T, E = unknown>(): [promise: Promise<T>, resolver: (val: T) => void, reject: (err: E) => void] {
  let a!: (val: T) => void, b!: (err: E) => void;
  const p = new Promise<T>((x, y) => {
    a = x;
    b = y;
  });
  return [p, a, b];
}
