import { BigNumber } from 'bignumber.js';

const operations = {
  // operation
  '+': (a: BigNumber, b: BigNumber) => a.plus(b),
  '-': (a: BigNumber, b: BigNumber) => a.minus(b),
  '/': (a: BigNumber, b: BigNumber) => a.dividedBy(b),
  '*': (a: BigNumber, b: BigNumber) => a.multipliedBy(b),
  '%': (a: BigNumber, b: BigNumber) => a.modulo(b),
  '**': (a: BigNumber, b: BigNumber) => a.exponentiatedBy(b),
  '<<': (a: BigNumber, b: BigNumber) => a.shiftedBy(+b.toNumber()),
  '>>': (a: BigNumber, b: BigNumber) => a.shiftedBy(-b.toNumber()),
  // comparable
  // '==': (a: BigNumber, b: BigNumber) => a.isEqualTo(b),
  // '>': (a: BigNumber, b: BigNumber) => a.isGreaterThan(b),
  // '<': (a: BigNumber, b: BigNumber) => a.isLessThan(b),
  // '>=': (a: BigNumber, b: BigNumber) => a.isGreaterThanOrEqualTo(b),
  // '<=': (a: BigNumber, b: BigNumber) => a.isLessThanOrEqualTo(b),
  // math kit
  // 'abs': (a: BigNumber) => a.absoluteValue(),
  // 'sqrt': (a: BigNumber) => a.squareRoot(),
};

type Oper = keyof typeof operations;

export function expr(op: Oper, a: BigNumber.Value, b: BigNumber.Value) {
  return operations[op](new BigNumber(a), new BigNumber(b));
}