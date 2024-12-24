import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { FirstFunction } from "./FirstFunction/first-function";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LearnLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new FirstFunction(this, "FirstFunction");
  }
}
