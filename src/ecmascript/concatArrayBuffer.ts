export function concatArrayBuffer(...parts: ArrayBuffer[]): ArrayBuffer {
    const buffers = parts.map((x) => new Uint8Array(x))
    const u8 = new Uint8Array(buffers.reduce((a, b) => a + b.length, 0))

    let last = 0
    for (const each of buffers) {
        u8.set(each, last)
        last += each.length
    }
    return u8.buffer
}
