export function isStringTag<T>(value: any, tag: string): value is T {
  return Reflect.get(value, Symbol.toStringTag) === tag;
}

export function assertStringTag<T>(value: any, tag: string, message: string): asserts value is T {
  if (!isStringTag(value, tag)) {
    throw new Error(message);
  }
}
