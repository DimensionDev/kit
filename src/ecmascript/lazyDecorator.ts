/**
 * @description The lazy decorator.
 * @example
 * class T {
 *     ;@lazy accessor value = lazy.of(() => getData())
 * }
 */
export function lazy<T, V>(
    target: ClassAccessorDecoratorTarget<T, V>, // context: ClassAccessorDecoratorContext<T, V>
): ClassAccessorDecoratorResult<T, V> {
    const { get, set } = target
    let init = false
    return {
        get() {
            const val = get.call(this)
            if (!init) {
                if (typeof val !== 'function') throw new TypeError('Please use lazy.of(() => ...) to wrap the value.')
                set.call(this, val())
                init = true
            }
            return val
        },
        set(val) {
            init ||= true
            set.call(this, val)
        },
    }
}
/**
 * DO NOT use this function without the lazy decorator! It actually returning the init function instead of the value
 * @param init The init function
 */
lazy.of = <T extends any>(init: () => T): T => init as any
