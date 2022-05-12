export const blobToDataURL = factory<string>('DataURL')
export const blobToText = factory<string>('Text')

function factory<T extends string | ArrayBuffer>(method: 'ArrayBuffer' | 'BinaryString' | 'DataURL' | 'Text') {
    return (blob: Blob) => {
        return new Promise<T>((resolve, reject) => {
            const reader = new FileReader()
            reader.addEventListener('error', () => {
                reject(reader.error)
            })
            reader.addEventListener('load', () => {
                resolve(reader.result as T)
            })
            reader[`readAs${method}`](blob)
        })
    }
}
