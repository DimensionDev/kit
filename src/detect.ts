export function detectAudioSupport(url: string) {
  return detectMediaSupport('audio', url);
}

export function detectVideoSupport(url: string) {
  return detectMediaSupport('video', url);
}

export function detectImageSupport(url: string) {
  return detectMediaSupport('img', url);
}

export async function findAvailableImageURL(srcset: ArrayLike<string>) {
  for (const url of Array.from(srcset)) {
    if (await detectImageSupport(url)) {
      return url;
    }
  }
  throw new Error('unavailable');
}

function detectMediaSupport(name: 'img' | 'audio' | 'video', url: string) {
  return new Promise<boolean>((resolve) => {
    const reject = () => resolve(false);
    const element = document.createElement(name);
    element.addEventListener('error', reject);
    element.addEventListener('abort', reject);
    element.addEventListener('load', () => resolve(true));
    element.addEventListener('loadedmetadata', () => resolve(true));
    element.src = url;
  });
}
