import lambdaTester from 'lambda-tester';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { unknownRoute404 } from '../../../app/handlers/unknownRoute404Handler';

describe('POST: unknownRoute', () => {
  it('Missing body params returns 404 bad request error', async () => {
    await lambdaTester(unknownRoute404)
      .event({
        httpMethod: 'POST',
        body: JSON.stringify({
          name: 'image1',
        }),
      } as APIGatewayProxyEvent)
      .expectResult((result: any) => expect(result).toEqual({
        body: '{"error":"Unknown route 404"}',
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 404,
      }));
  });
});
