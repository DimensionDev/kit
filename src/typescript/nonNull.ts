export function assertNonNull<T>(val: T, message = 'Unexpected nil value detected') {
    if (val === null || val === undefined) throw new Error(message)
    return val as NonNullable<T>
}
export function isNonNull<T>(x: undefined | null | T): x is T {
    return x !== undefined && x !== null
}
