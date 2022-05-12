export function encodeHexString(input: Uint8Array) {
    return [...input].map((value) => (value < 10 ? '0' : '') + value.toString(16)).join('')
}

export function decodeHexString(input: string) {
    const values: number[] = []
    for (let index = 0; index < input.length; index += 2) {
        const value = Number.parseInt(input.slice(index, index + 2), 16)
        if (Number.isNaN(value)) throw new Error('The string not is hex string')
        values.push(value)
    }
    return Uint8Array.from(values)
}
