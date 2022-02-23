export function getEnumAsArray<T extends object>(enumObject: T) {
    return (
        Object.keys(enumObject)
            // Leave only key of enum
            .filter((x) => Number.isNaN(Number.parseInt(x)))
            .map((key) => ({ key, value: enumObject[key as keyof T] }))
    )
}
export function getEnumAsObject<T>(enumArray: T[], getKey: (v: T) => string) {
    return enumArray.reduce<Record<string, T>>((accumulator, x) => {
        accumulator[getKey(x)] = x
        return accumulator
    }, {})
}
