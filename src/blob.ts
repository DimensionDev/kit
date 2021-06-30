export const toArrayBuffer = factory('readAsArrayBuffer');

export const toBinaryString = factory('readAsBinaryString');

export const toDataURL = factory('readAsDataURL');

export const toText = factory('readAsText');

interface Methods {
  readAsArrayBuffer: ArrayBuffer;
  readAsBinaryString: string;
  readAsDataURL: string;
  readAsText: string;
}

function factory<T extends keyof Methods>(method: T) {
  return (blob: Blob) => {
    return new Promise<Methods[T]>((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('error', () => {
        reject(reader.error);
      });
      reader.addEventListener('load', () => {
        resolve(reader.result as Methods[T]);
      });
      reader[method](blob);
    });
  };
}
