export const toArrayBuffer = factory<ArrayBuffer>('readAsArrayBuffer');

export const toBinaryString = factory<string>('readAsBinaryString');

export const toDataURL = factory<string>('readAsDataURL');

export const toText = factory<string>('readAsText');

function factory<T>(method: 'readAsArrayBuffer' | 'readAsBinaryString' | 'readAsDataURL' | 'readAsText') {
  return (blob: Blob) => {
    return new Promise<T>((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('error', () => {
        reject(reader.error);
      });
      reader.addEventListener('load', () => {
        resolve(reader.result as any as T);
      });
      reader[method](blob);
    });
  };
}
