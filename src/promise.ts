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
