import { IsUrl, IsArray, ArrayMinSize, ArrayMaxSize, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class ImageDimension {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  dimensions: number[];
}

export class ResizeRequest {
  @IsUrl()
  imageUrl: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => ImageDimension)
  dimensions: ImageDimension[];
}