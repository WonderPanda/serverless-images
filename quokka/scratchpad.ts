import { S3 } from 'aws-sdk';
import fetch from 'node-fetch';
import { basename } from 'path';

let something = basename('https://adrianhesketh.files.wordpress.com/2017/07/serverless_logo.png');
console.log(something);

let s3 = new S3();

(async() => {
  let imageUrl = "https://adrianhesketh.files.wordpress.com/2017/07/serverless_logo.png"
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.buffer();

  let putOp = s3.putObject({
    Bucket: "serverless-images-bucket",
    Key: 'testing',
    Body: imageBuffer
  })

  let response = await putOp.promise();
  //let response2 = await response;
  console.log(response);
})();