import { once } from 'lodash-es'

const createDlElement = once(() => document.createElement('a'))

export function saveAsFileFromUrl(url: string, fileName = '', isAndroid = true) {
  if (isAndroid) {
      const dlElem = createDlElement()
      dlElem.href = url
      dlElem.download = fileName
      dlElem.click()
  } else {
      browser.downloads.download({
          url,
          filename: fileName,
          saveAs: true,
      })
  }
}

export function saveAsFileFromBuffer(file: BufferSource, mimeType: string, fileName = '', isAndroid = true) {
  const blob = new Blob([file], { type: mimeType })
  const url = URL.createObjectURL(blob)
  saveAsFileFromUrl(url, fileName, isAndroid)
}
