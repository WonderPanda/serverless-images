export type ImageDimension = [number, number]

export interface IResizeRequest {
  imageUrl: string;
  dimensions: ImageDimension[];
}