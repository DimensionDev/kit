export type HasNonNullableAbortSignal<T extends unknown[]> = false extends (
    T extends [infer Head, ...infer Rest] ? (Head extends AbortSignal ? true : HasNonNullableAbortSignal<Rest>) : false
)
    ? false
    : true

export function combineAbortSignal<T extends (AbortSignal | undefined | null)[]>(
    ..._: T
): HasNonNullableAbortSignal<T> extends true ? AbortSignal : AbortSignal | undefined {
    const signals = _.filter<AbortSignal>(Boolean as any)
    if (signals.length === 0) return undefined!
    if (signals.length === 1) return signals[0] ?? undefined!

    if (AbortSignal.any) return AbortSignal.any(signals)

    const aborted = signals.find((x) => x.aborted)
    if (aborted) return aborted

    const controller = new AbortController()
    const abort = () => controller.abort(signals.find((x) => x.aborted)?.reason)
    for (const signal of signals) {
        signal.addEventListener('abort', abort, { signal: controller.signal })
    }
    return controller.signal
}
declare var AbortSignal: {
    any?(iterable: Iterable<AbortSignal>): AbortSignal
}
