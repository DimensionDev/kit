/** @deprecated Use [AbortSignal.timeout](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout) instead. */
export function abortSignalTimeout(ms: number) {
    const x = new AbortController()
    setTimeout(() => x.abort(), ms)
    return x.signal
}
