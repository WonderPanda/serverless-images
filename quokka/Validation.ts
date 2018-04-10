import 'reflect-metadata'
import { IsUrl, IsArray, validate, ArrayMinSize } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { transformAndValidate } from 'class-transformer-validator';

import { ImageDimension, ResizeRequest } from '../domain';


// const request = new ResizeRequest();
// request.imageUrl = 'https://adrianhesketh.files.wordpress.com/2017/07/serverless_logo.png';
// request.dimensions = [[300, 300]];

const request = { 
  imageUrl: 'https://github.com/typestack/class-transformer',
  dimensions: [[300, 300]]
};

let transformed = plainToClass(ResizeRequest, request);
console.log(transformed);

(async () => {
  try {
    console.log(request);
    await transformAndValidate(ResizeRequest, request); /* ?. */
  } catch (error) {

  }

  const errors = await validate(transformed);
  console.log(errors);
})();