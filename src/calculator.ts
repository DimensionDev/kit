import { BigNumber } from 'bignumber.js';

const operations = {
  '+': (a: BigNumber, b: BigNumber) => a.plus(b),
  '-': (a: BigNumber, b: BigNumber) => a.minus(b),
  '/': (a: BigNumber, b: BigNumber) => a.dividedBy(b),
  '*': (a: BigNumber, b: BigNumber) => a.multipliedBy(b),
  '%': (a: BigNumber, b: BigNumber) => a.modulo(b),
  '**': (a: BigNumber, b: BigNumber) => a.exponentiatedBy(b),
  '<<': (a: BigNumber, b: BigNumber) => a.shiftedBy(+b.toNumber()),
  '>>': (a: BigNumber, b: BigNumber) => a.shiftedBy(-b.toNumber()),
};

const kit = {
  abs: (a: BigNumber) => a.absoluteValue(),
  sqrt: (a: BigNumber) => a.squareRoot(),
};

type Kind = keyof typeof operations | keyof typeof kit;

type Value<K extends Kind> = K extends keyof typeof operations
  ? [K, BigNumber.Value | Value<Kind>, BigNumber.Value | Value<Kind>]
  : K extends keyof typeof kit
  ? [K, BigNumber.Value | Value<Kind>]
  : never;

export function expr(...values: Value<Kind>): BigNumber {
  if (isOperation(values)) {
    return operations[values[0]](
      toBigNumber(values[1]),
      toBigNumber(values[2]),
    );
  } else if (isMathKit(values)) {
    return kit[values[0]](toBigNumber(values[1]));
  }
  throw new TypeError('not supported operation');
}

function toBigNumber(input: BigNumber.Value | Value<Kind>) {
  return Array.isArray(input) ? expr(...input) : new BigNumber(input);
}

function isOperation(
  values: Value<Kind>,
): values is Value<keyof typeof operations> {
  return values.length === 3 && Object.keys(operations).includes(values[0]);
}

function isMathKit(values: Value<Kind>): values is Value<keyof typeof kit> {
  return values.length === 2 && Object.keys(kit).includes(values[0]);
}
