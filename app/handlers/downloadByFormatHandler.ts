import { Handler, Context, APIGatewayProxyEvent } from 'aws-lambda';
import { ImagesController } from '../controller/images';
import { downloadPayloadSchema2 } from '../schemas/download';
import {
  error400, error404, error500, retrievedByType,
} from '../utils/httpStatus';

const imagesController = new ImagesController();

export const downloadByFormat: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
  let eventBody = null;

  try {
    eventBody = downloadPayloadSchema2.parse(event.queryStringParameters);
  } catch (error) {
    return error400(error);
  }

  try {
    const downloadImageInfo = await imagesController.downloadByType(eventBody, context);
    return retrievedByType(downloadImageInfo, eventBody.ext);
  } catch (error) {
    if (error.message === 'Invalid image extension, cannot convert') {
      return error400(error);
    }
    if (error.message === 'Image does not exist') {
      return error404(error);
    }

    return error500(error);
  }
};
