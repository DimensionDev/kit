import { isEuqals } from './buffer';

/* eslint-disable no-bitwise */
export function getDimensionAsPNG(buf: ArrayBuffer) {
  const view = new DataView(buf, 0, 28);
  return { width: view.getInt32(16), height: view.getInt32(20) };
}

/**
 * Get dimension of a JPEG image
 * @see http://vip.sugovica.hu/Sardi/kepnezo/JPEG%20File%20Layout%20and%20Format.htm
 */
export function getDimensionAsJPEG(buf: ArrayBuffer) {
  const MAGIC_1 = Uint8Array.of(0xff, 0xd8, 0xff, 0xe0);
  const MAGIC_2 = Uint8Array.of(0x4a, 0x46, 0x49, 0x46, 0x00);

  const view = new DataView(buf);
  let index = 0;
  if (!isEuqals(buf.slice(index, index + 4), MAGIC_1)) {
    return;
  }
  index += 4;
  if (!isEuqals(buf.slice(index + 2, index + 6), MAGIC_2)) {
    return;
  }
  let blockLength = view.getUint8(index) * 256 + view.getUint8(index + 1);
  while (index < view.byteLength) {
    index += blockLength;
    if (index >= view.byteLength) return;
    if (view.getUint8(index) !== 0xff) return;
    const marker = view.getUint8(index + 1); // SOF0 / SOF2 marker
    if (!(marker === 0xc0 || marker === 0xc2)) {
      index += 2;
      blockLength = view.getUint8(index) * 256 + view.getUint8(index + 1);
      continue;
    }
    return {
      height: view.getUint8(index + 5) * 256 + view.getUint8(index + 6),
      width: view.getUint8(index + 7) * 256 + view.getUint8(index + 8),
    };
  }
}

export function loadImage(src: HTMLImageElement['src']) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const source = new Image();
    source.addEventListener('error', reject);
    source.addEventListener('load', () => {
      resolve(source);
    });
    source.src = src;
  });
}
