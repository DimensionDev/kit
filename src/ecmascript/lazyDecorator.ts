/**
 * @description The lazy decorator.
 * @example
 * class T {
 *     ;@lazy accessor value = lazy.of(() => getData())
 * }
 */
export function lazy<C, T>(
    { get, set }: ClassAccessorDecoratorTarget<C, T>,
    { name, static: s }: ClassAccessorDecoratorContext<C, T>,
): ClassAccessorDecoratorResult<C, T> {
    let init: ((C: C) => T) | undefined = function (C: C) {
        const f = get.call(C) as any as () => T
        if (!(initMap ||= new WeakSet()).has(f))
            throw new Error(
                `Wrong usage of lazy decorator. Please write:\n    @lazy${s ? ' static' : ''} accessor ${
                    typeof name === 'string' ? name : '[symbol]'
                } = lazy.mark(() => ...)`,
            )
        const value = f()
        init = undefined
        set.call(C, value)
        return value
    }
    return {
        get(this: C) {
            init?.(this)
            return get.call(this)
        },
        set(this: C, val: T) {
            init?.(this)
            set.call(this, val)
        },
    }
}
let initMap: WeakSet<object>
/**
 * DO NOT use this function without the lazy decorator! It actually returning the init function instead of the value
 * @param init The init function
 */
lazy.of = function <T>(init: (this: undefined) => T): T {
    const f = Reflect.apply(Function.bind, init, [undefined])
    ;(initMap ||= new WeakSet()).add(f)
    return f
}
