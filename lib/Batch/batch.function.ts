//import { DynamoDB } from "aws-sdk";
import { Context } from "aws-lambda";
import * as fs from "fs";

//const dynamoDb = new DynamoDB.DocumentClient();
//const tableName = process.env.TABLE_NAME || "SampleTable";
interface Event {
  length: number;
}

export const handler = async (
  event: Event,
  context: Context,
): Promise<void> => {
  console.log("Event: ", JSON.stringify(event, null, 2));
  console.log("Context: ", JSON.stringify(context, null, 2));

  const data = fs.readFileSync("data.txt", "utf8");
  console.log("Data: ", data);

  //// Example: Put a new item into the DynamoDB table
  //const params = {
  //  TableName: tableName,
  //  Item: {
  //    id: "example-id",
  //    timestamp: new Date().toISOString(),
  //    message: "Hello from Lambda!",
  //  },
  //};

  //try {
  //  await dynamoDb.put(params).promise();
  //  console.log("Item successfully written to DynamoDB");
  //} catch (error) {
  //  console.error("Error writing to DynamoDB", error);
  //}
};
