export function blobToDataURL(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('error', () => {
            reject(reader.error)
        })
        reader.addEventListener('load', () => {
            resolve(reader.result as string)
        })
        reader.readAsDataURL(blob)
    })
}
