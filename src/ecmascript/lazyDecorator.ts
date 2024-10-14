/**
 * @description The lazy decorator.
 * @example
 * class T {
 *     ;@lazy accessor value = lazy.of(() => getData())
 * }
 */
export function lazy<C, T>({ get, set }: ClassAccessorDecoratorTarget<C, T>): ClassAccessorDecoratorResult<C, T> {
    function init(C: C) {
        const current = get.call(C) as any
        initFunctionMap ||= new WeakSet()
        if (initFunctionMap.has(current)) {
            const initValue = current()
            set.call(C, initValue)
            initFunctionMap.delete(current)
            return initValue
        } else return current
    }
    return {
        get(this: C) {
            return init(this)
        },
        set(this: C, val: T) {
            init(this)
            set.call(this, val)
        },
    }
}
let initFunctionMap: WeakSet<object>
/**
 * DO NOT use this function without the lazy decorator! It actually returning the init function instead of the value
 * @param init The init function
 */
lazy.of = function <T>(init: (this: undefined) => T): T {
    const f = Reflect.apply(Function.bind, init, [undefined])
    ;(initFunctionMap ||= new WeakSet()).add(f)
    return f
}
