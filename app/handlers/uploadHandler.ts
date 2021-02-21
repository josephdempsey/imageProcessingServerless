import { Handler, Context, APIGatewayProxyEvent } from 'aws-lambda';
import { ImagesController } from '../controller/images';
import { uploadPayloadSchema } from '../schemas/upload';

const imagesController = new ImagesController();

export const upload: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
  debugger
  let eventBody = null;

  try {
    eventBody = uploadPayloadSchema.parse(JSON.parse(event.body || ''));
  } catch (error) {
    return {
      body: JSON.stringify({ error: error.message, IS_OFFLINE: process.env.IS_OFFLINE }),
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 400,
    };
  }

  try {
    const uploadedImageInfo = await imagesController.upload(eventBody, context);
    return {
      body: JSON.stringify({ info: uploadedImageInfo, IS_OFFLINE: process.env.IS_OFFLINE }),
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 201,
    };
  } catch (error) {
    return {
      body: JSON.stringify({ error: error.message, IS_OFFLINE: process.env.IS_OFFLINE }),
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 500,
    };
  }
};
