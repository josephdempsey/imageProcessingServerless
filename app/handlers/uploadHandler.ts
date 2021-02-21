import { Handler, Context, APIGatewayProxyEvent } from 'aws-lambda';
import { ImagesController } from '../controller/images';
import { uploadPayloadSchema } from '../schemas/upload';
import { error400, error500, created } from '../utils/httpStatus';

const imagesController = new ImagesController();

export const upload: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
  let eventBody = null;

  try {
    eventBody = uploadPayloadSchema.parse(JSON.parse(event.body || ''));
  } catch (error) {
    return error400(error);
  }

  try {
    const uploadedImageInfo = await imagesController.upload(eventBody, context);
    return created(uploadedImageInfo);
  } catch (error) {
    return error500(error);
  }
};
