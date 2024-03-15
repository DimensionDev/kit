/**
 * Warn a message only once.
 * @example
 * const warn = warnOnce('This is a warning')
 * warn() // This is a warning
 * warn() // (no output)
 */
export function warnOnce(...data: any[]) {
    let warned = false
    return () => {
        if (warned) return
        warned = true
        console.warn(...data)
    }
}
