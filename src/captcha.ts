import { random, sample } from 'lodash-es';

export function makeNumberCaptcha(): ['+' | '-' | '*' | '/', number, number, number] {
  const operation = sample('+-*/')!;
  if (operation === '+') {
    const a = random(1, 50);
    const b = random(1, 50);
    return [operation, a, b, a + b];
  } else if (operation === '-') {
    const a = random(1, 50);
    const b = random(a, a + 50);
    return [operation, b, a, b - a];
  } else if (operation === '*') {
    const a = random(1, 10);
    const b = random(2, 10);
    return [operation, a, b, a * b];
  } else if (operation === '/') {
    const a = random(1, 10);
    const b = random(2, 10);
    return [operation, a * b, b, a];
  } else {
    throw new Error('unsupported operation');
  }
}
