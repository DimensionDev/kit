export function isArrayBufferEqual(a: Uint8Array, b: Uint8Array): boolean
export function isArrayBufferEqual(a: ArrayBuffer, b: ArrayBuffer): boolean
export function isArrayBufferEqual(a: any, b: any): boolean {
    if (a instanceof ArrayBuffer) {
        a = new Uint8Array(a)
    }
    if (b instanceof ArrayBuffer) {
        b = new Uint8Array(b)
    }
    if (!(a instanceof Uint8Array)) {
        return false
    } else if (!(b instanceof Uint8Array)) {
        return false
    } else if (a.byteLength !== b.byteLength) {
        return false
    }
    return a === b || a.every((value, index) => b[index] === value)
}
