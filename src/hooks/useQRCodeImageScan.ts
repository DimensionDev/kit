import React, { useEffect, useRef, useState } from 'react';
import { useAsync } from 'react-use';
import { loadImage } from '../image';

export function useQRCodeImageScan(
  image: React.MutableRefObject<HTMLImageElement | null>,
) {
  const scanner = useRef(new BarcodeDetector({ formats: ['qr_code'] }));
  const [source, setSource] = useState('');
  useEffect(() => {
    const { current } = image;
    if (current === null) {
      setSource('');
      return;
    }
    const onLoad = () => {
      setSource(image.current?.src ?? '');
    };
    const onError = () => {
      setSource('');
    };
    current.addEventListener('load', onLoad);
    current.addEventListener('error', onError);
    return () => {
      current.removeEventListener('load', onLoad);
      current.removeEventListener('error', onError);
    };
  }, [image.current]);
  return useAsync(async () => {
    const image = await loadImage(source);
    const detected = await scanner.current.detect(image);
    return detected?.[0].rawValue;
  }, [source, scanner.current]);
}
