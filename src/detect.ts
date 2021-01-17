export function detectAudioSupport(url: string) {
  return detectMediaSupport('audio', url);
}

export function detectVideoSupport(url: string) {
  return detectMediaSupport('video', url);
}

export function detectImageSupport(url: string) {
  return detectMediaSupport('img', url);
}

export function findAvailableImageURL(srcset: ArrayLike<string>, timeout?: number) {
  const promises = Array.from(srcset).map((url) => detectImageSupport(url));
  const id =
    timeout &&
    setTimeout(() => {
      throw new Error('unavailable');
    }, timeout);
  return new Promise((resolve) => {
    Promise.any(promises).then((url) => {
      id && clearTimeout(id);
      resolve(url);
    });
    Promise.allSettled(promises).then((r) => {
      if (r.every((v) => v.status === 'rejected')) throw new Error('unavailable');
    });
  });
}

function detectMediaSupport(name: 'img' | 'audio' | 'video', url: string) {
  return new Promise<string>((resolve, reject) => {
    const element = document.createElement(name);
    element.addEventListener('error', reject);
    element.addEventListener('abort', reject);
    element.addEventListener('load', () => resolve(url));
    element.addEventListener('loadedmetadata', () => resolve(url));
    element.src = url;
  });
}
