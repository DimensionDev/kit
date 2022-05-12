export function encodeText(input: string) {
    return new TextEncoder().encode(input)
}

export function decodeText(input: Iterable<number>) {
    return new TextDecoder().decode(Uint8Array.from(input))
}

export function decodeArrayBuffer(input: string) {
    const decoded = atob(input)
    const buffer = new Uint8Array(decoded.length)
    for (let i = 0; i < decoded.length; i++) {
        buffer[i] = decoded.charCodeAt(i)
    }
    return buffer.buffer
}

export function encodeArrayBuffer(input: Iterable<number>) {
    let encoded = ''
    for (const code of Uint8Array.from(input)) {
        encoded += String.fromCharCode(code)
    }
    return btoa(encoded)
}
