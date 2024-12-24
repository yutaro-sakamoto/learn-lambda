import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class FirstFunction extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new NodejsFunction(this, "function");
  }
}
