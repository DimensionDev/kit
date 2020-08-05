export function detectAudioSupport(url: string) {
  return detectMediaSupport('audio', url);
}

export function detectVideoSupport(url: string) {
  return detectMediaSupport('video', url);
}

export function detectImageSupport(url: string) {
  return new Promise<boolean>((resolve) => {
    const element = document.createElement('img');
    element.addEventListener('load', () => {
      resolve(true);
    });
    element.addEventListener('error', () => {
      resolve(false);
    });
    element.src = url;
  });
}

function detectMediaSupport(name: 'audio' | 'video', url: string) {
  return new Promise<boolean>((resolve) => {
    const reject = () => resolve(false);
    const element = document.createElement(name);
    element.addEventListener('error', reject);
    element.addEventListener('abort', reject);
    element.addEventListener('loadedmetadata', () => resolve(true));
    element.src = url;
  });
}
