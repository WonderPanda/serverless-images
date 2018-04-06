import { ImageDimension } from '../interfaces/IResizeRequest';
import { IsUrl, IsArray, validate, ArrayMinSize } from 'class-validator';

class ResizeRequest {
  @IsUrl()
  imageUrl: string;

  @IsArray()
  @ArrayMinSize(1)
  dimensions: ImageDimension[];
}

const request = new ResizeRequest();
request.imageUrl = 'https://adrianhesketh.files.wordpress.com/2017/07/serverless_logo.png';
request.dimensions = [[300, 300]];

(async () => {
  const errors = await validate(request);
  console.log(errors);
})();