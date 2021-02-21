import { Handler, Context, APIGatewayProxyEvent } from 'aws-lambda';
import { ImagesController } from '../controller/images';
import { downloadPayloadSchema } from '../schemas/download';
import {
  error400, error404, error500, retrieved,
} from '../utils/httpStatus';

const imagesController = new ImagesController();

export const download: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
  let eventBody = null;

  try {
    eventBody = downloadPayloadSchema.parse(event.queryStringParameters);
  } catch (error) {
    return error400(error);
  }

  try {
    const downloadImageInfo = await imagesController.download(eventBody, context);
    return retrieved(downloadImageInfo);
  } catch (error) {
    if (error.message === 'Image does not exist') {
      return error404(error);
    }

    return error500(error);
  }
};
