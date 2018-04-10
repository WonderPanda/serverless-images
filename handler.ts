import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import fetch from 'node-fetch';
import { basename } from 'path';
import { ResizeRequest } from './domain';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

const s3 = new S3();

export const resize: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const resizeRequest = plainToClass(ResizeRequest, event.body);
  const errors = await validate(resizeRequest);

  if (errors) {
    cb(null, {
      statusCode: 400,
      body: errors
    });

    return;
  }

  const imageResponse = await fetch(resizeRequest.imageUrl);
  const imageBuffer = await imageResponse.buffer();

  await s3.putObject({
    Bucket: "serverless-images-bucket",
    Key: basename(resizeRequest.imageUrl),
    Body: imageBuffer
  }).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      resizeRequest,
      input: event,
    }),
  };

  cb(null, response);
}
