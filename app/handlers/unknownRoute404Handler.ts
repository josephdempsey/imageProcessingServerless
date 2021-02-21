import { Context, APIGatewayProxyEvent } from 'aws-lambda';
import { error404 } from '../utils/httpStatus';

export const unknownRoute404 = async (event: APIGatewayProxyEvent, context: Context) => {
  console.info(`EVENT\n${JSON.stringify(event, null, 2)}`);
  console.info(`version: ${context.functionVersion}, awsRequestId: ${context.awsRequestId}, logStreamName: ${context.logStreamName}, memoryLimitInMB: ${context.memoryLimitInMB}`);
  return error404(new Error('Unknown route 404'));
};
