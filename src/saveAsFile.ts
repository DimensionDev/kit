export function saveAsFileFromURL(
  url: string,
  fileName = '',
  isAndroid = true,
) {
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

export function saveAsFileFromBuffer(
  parts: BufferSource[],
  type?: string,
  fileName = '',
  isAndroid = true,
) {
  const blob = new Blob(parts, { type });
  const url = URL.createObjectURL(blob);
  saveAsFileFromURL(url, fileName, isAndroid);
}
