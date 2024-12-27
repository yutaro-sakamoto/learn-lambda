import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3n from "aws-cdk-lib/aws-s3-notifications";

export class FileProcessor extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const fileConvertFunction = new NodejsFunction(this, "function");
    const bucket = new s3.Bucket(this, "bucket");
    bucket.grantReadWrite(fileConvertFunction);
    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(fileConvertFunction),
    );
  }
}
