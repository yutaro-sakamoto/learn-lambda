import { Context } from "aws-lambda";

interface Event {
  length: number;
  width: number;
}

export const handler = async (event: Event, context: Context) => {
  const length = event.length;
  const width = event.width;
  const area = calculateArea(length, width);

  console.log(`The area is ${area}`);
  console.log("CloudWatch log group: ", context.logGroupName);

  const data = {
    area: area,
  };
  return JSON.stringify(data);

  function calculateArea(length: number, width: number): number {
    return length * width;
  }
};
