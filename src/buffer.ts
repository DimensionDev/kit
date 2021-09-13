import { blobToArrayBuffer } from './blob';

export function encodeText(input: string) {
  return new TextEncoder().encode(input);
}

export function decodeText(input: ArrayBuffer) {
  return new TextDecoder().decode(input);
}

export function decodeArrayBuffer(input: string) {
  const decoded = atob(input);
  const buffer = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) {
    buffer[i] = decoded.charCodeAt(i);
  }
  return buffer.buffer;
}

export function encodeArrayBuffer(input: ArrayBuffer) {
  let encoded = '';
  for (const code of new Uint8Array(input)) {
    encoded += String.fromCharCode(code);
  }
  return btoa(encoded);
}

export function concatArrayBufferSync(...parts: ArrayBuffer[]): ArrayBuffer {
  const buffers = parts.map((x) => new Uint8Array(x));
  const u8 = new Uint8Array(buffers.reduce((a, b) => a + b.length, 0));

  let last = 0;
  for (const each of buffers) {
    u8.set(each, last);
    last += each.length;
  }
  return u8.buffer;
}
export async function concatArrayBuffer(...parts: ArrayBuffer[]) {
  return concatArrayBufferSync(...parts);
}

export function isEuqals(a: Uint8Array, b: Uint8Array): boolean;
export function isEuqals(a: ArrayBuffer, b: ArrayBuffer): boolean;
export function isEuqals(a: any, b: any): boolean {
  if (a instanceof ArrayBuffer) {
    a = new Uint8Array(a);
  }
  if (b instanceof ArrayBuffer) {
    b = new Uint8Array(b);
  }
  if (!(a instanceof Uint8Array)) {
    return false;
  } else if (!(b instanceof Uint8Array)) {
    return false;
  } else if (a.byteLength !== b.byteLength) {
    return false;
  }
  return a === b ?? a.every((value, index) => b[index] === value);
}
