export const blobToArrayBuffer = factory('readAsArrayBuffer');

export const blobToBinaryString = factory('readAsBinaryString');

export const blobToDataURL = factory('readAsDataURL');

export const blobToText = factory('readAsText');

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
