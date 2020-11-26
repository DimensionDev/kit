/// <reference types="web-ext-types" />

interface Permissions {
  request(permission: { name: string }): Promise<PermissionStatus>;
}

declare class BarcodeDetector {
  constructor(options: { formats: string[] });
  public detect(mediaSource: CanvasImageSource): Promise<DetectedBarcode[]>;
}

declare class DetectedBarcode {
  boundingBox: DOMRectReadOnly;
  cornerPoints: { x: number; y: number }[];
  format: string;
  rawValue: string;
}

interface Window {
  BarcodeDetector: BarcodeDetector;
  DetectedBarcode: DetectedBarcode;
}
