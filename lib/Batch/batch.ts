import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as cdk from "@aws-cdk/core";

export class Batch extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Create a new Typescript Lambda function
    const batchFunction = new NodejsFunction(this, "function");

    // Create a new DynamoDB table
    const sampleTable = new dynamodb.Table(this, "SampleTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    sampleTable.grantReadWriteData(batchFunction);

    // Run the Lambda function periodically
    new events.Rule(this, "Rule", {
      schedule: events.Schedule.cron({ minute: "0", hour: "4" }),
      targets: [new targets.LambdaFunction(batchFunction)],
    });
  }
}
