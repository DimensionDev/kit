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

const collection = {
  max: BigNumber.max,
  min: BigNumber.min,
  sum: BigNumber.sum,
};

type Kind = keyof typeof operations | keyof typeof collection | keyof typeof kit;

type Value<K extends Kind> = K extends keyof typeof operations
  ? [BigNumber.Value | Value<Kind>, K, BigNumber.Value | Value<Kind>]
  : K extends keyof typeof kit
  ? [K, BigNumber.Value | Value<Kind>]
  : K extends keyof typeof collection
  ? [K, ...(BigNumber.Value | Value<Kind>)[]]
  : never;

export function expr(...values: Value<Kind>): BigNumber {
  if (isOperation(values)) {
    return operations[values[1]](toBigNumber(values[0]), toBigNumber(values[2]));
  } else if (isMathKit(values)) {
    return kit[values[0]](toBigNumber(values[1]));
  } else if (isCollection(values)) {
    return collection[values[0]](...values.slice(1).map(toBigNumber));
  }
  throw new TypeError('not supported operation');
}

function toBigNumber(input: BigNumber.Value | Value<Kind>) {
  return Array.isArray(input) ? expr(...input) : new BigNumber(input);
}

function isOperation(values: any): values is Value<keyof typeof operations> {
  return Object.keys(operations).includes(values[1]);
}

function isMathKit(values: any): values is Value<keyof typeof kit> {
  return Object.keys(kit).includes(values[0]);
}

function isCollection(values: any): values is Value<keyof typeof collection> {
  return Object.keys(collection).includes(values[0]);
}
