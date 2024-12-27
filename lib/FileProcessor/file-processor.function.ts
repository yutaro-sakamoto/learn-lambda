import { S3Event, Context } from "aws-lambda";
import { S3, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3();

export const handler = async (event: S3Event, context: Context) => {
  for (const record of event.Records) {
    console.log(record.s3.bucket.name);
    console.log(record.s3.object.key);
    console.log("CloudWatch log group: ", context.logGroupName);
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

    if (key.toLowerCase().startsWith("src/")) {
      const getObjectCommand = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });
      const response = await s3.send(getObjectCommand);
      const str = await response.Body?.transformToString();
      const putObjectCommand = new PutObjectCommand({
        Bucket: bucket,
        Key: key.replace(/^src\//, "dst/"),
        Body: str + " hello world",
      });
      await s3.send(putObjectCommand);
    }
  }
};
