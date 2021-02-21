import { Context, APIGatewayProxyEvent } from 'aws-lambda';

export const unknownRoute404 = async (event: APIGatewayProxyEvent, context: Context) => {
  console.info(`EVENT\n${JSON.stringify(event, null, 2)}`);
  console.info(`version: ${context.functionVersion}, awsRequestId: ${context.awsRequestId}, logStreamName: ${context.logStreamName}, memoryLimitInMB: ${context.memoryLimitInMB}`);
  return {
    body: JSON.stringify({ error: 'Unknown route 404', IS_OFFLINE: process.env.IS_OFFLINE }),
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 404,
  };
};
