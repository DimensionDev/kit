export function abortSignalTimeout(ms: number) {
    const x = new AbortController()
    setTimeout(() => x.abort(), ms)
    return x.signal
}
