import { isMacPlatform } from './platform';

export function formatFileSize(input = 0, si = isMacPlatform(), fractionDigits = 1) {
  if (input === 0 || Number.isNaN(input)) {
    return '0 B';
  }
  const units = ['', 'K', 'M', 'G', 'T', 'P'];
  const base = si ? 1000 : 0x400;
  const n = Math.min(Math.floor(Math.log(input) / Math.log(base)), units.length - 1);
  const value = input / Math.pow(base, n);
  const formatted = n === 0 ? value : value.toFixed(fractionDigits);
  return `${formatted} ${units[n]}${si ? '' : 'i'}B`;
}

export function saveAsFileFromURL(url: string, fileName = '', isAndroid = true) {
  if (isAndroid) {
    const element = document.createElement('a');
    element.href = url;
    element.download = fileName;
    element.click();
  } else {
    browser.downloads.download({
      url,
      filename: fileName,
      saveAs: true,
    });
  }
}

export function saveAsFileFromBuffer(parts: BufferSource[], type?: string, fileName = '', isAndroid = true) {
  const blob = new Blob(parts, { type });
  const url = URL.createObjectURL(blob);
  saveAsFileFromURL(url, fileName, isAndroid);
}
