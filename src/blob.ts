export const blobToArrayBuffer = factory('readAsArrayBuffer');

export const blobToBinaryString = factory('readAsBinaryString');

export const blobToDataURL = factory('readAsDataURL');

export const blobToText = factory('readAsText');

export function blobToStream(blob: Blob, chunkSize = 0x80000) {
  let position = 0;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const chunk = await blobToArrayBuffer(blob.slice(position, position + chunkSize));
      position += chunk.byteLength;
      controller.enqueue(new Uint8Array(chunk));
      if (position === blob.size) {
        controller.close();
      }
    },
  });
}

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
