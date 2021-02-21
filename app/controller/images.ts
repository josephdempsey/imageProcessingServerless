import { Context } from 'aws-lambda';
import { uploadPayloadSchemaType } from '../schemas/upload';
import { ImageStore } from '../repository/imageStore';
import { S3Service } from '../services/S3Service';

export class ImagesController {
  private s3Service: S3Service;

  imageStore: ImageStore;

  constructor() {
    this.s3Service = new S3Service();
    this.imageStore = new ImageStore(this.s3Service);
  }

  async upload(eventBody: uploadPayloadSchemaType, context: Context) {
    const file = Buffer.from(eventBody.imageBase64, 'base64');
    const uniqueFilename = `${eventBody.name}-${Date.now()}`;

    const processingTimeRemaining = context.getRemainingTimeInMillis();
    const uploadInfo = await this.imageStore.uploadImage(file, uniqueFilename);
    console.log('Upload processing time in milliseconds: ', processingTimeRemaining - context.getRemainingTimeInMillis());

    return uploadInfo;
  }
}
