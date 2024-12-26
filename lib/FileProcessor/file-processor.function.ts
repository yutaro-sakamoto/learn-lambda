import { S3Event, Context } from "aws-lambda";

export const handler = async (event: S3Event, context: Context) => {
  for (const record of event.Records) {
    console.log(record.s3.bucket.name);
    console.log(record.s3.object.key);
    console.log("CloudWatch log group: ", context.logGroupName);

    const data = {
      name: record.s3.bucket.name,
      key: record.s3.object.key,
    };
    return JSON.stringify(data);
  }
};
