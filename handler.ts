import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import fetch from 'node-fetch';
import { basename } from 'path';

const s3 = new S3();

export const resize: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  
  let body = JSON.parse(event.body);
  if (!body.imageUrl) {
    cb(null, {
      statusCode: 400
    });
  }

  const imageResponse = await fetch(body.imageUrl);
  const imageBuffer = await imageResponse.buffer();

  const put = s3.putObject({
    Bucket: "serverless-images-bucket",
    Key: basename(body.imageUrl),
    Body: imageBuffer
  })

  await put.promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  cb(null, response);
}
