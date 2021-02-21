import { Context } from 'aws-lambda';
import { uploadPayloadSchemaType } from '../schemas/upload';
import { downloadPayloadSchemaType, downloadPayloadSchemaType2 } from '../schemas/download';
import { ImageStore } from '../repository/imageStore';
import { ImageManipulationPackage } from '../repository/ImageManipulationPackage';
import { S3Service } from '../services/S3Service';
import { ImageMagickService } from '../services/imageMagickService';

export class ImagesController {
  private s3Service: S3Service;

  private imageMagickService: ImageMagickService;

  private validExtensions = ['png', 'jpeg', 'tiff', 'webp'];

  imageStore: ImageStore;

  imageManipulationPackage: ImageManipulationPackage;

  constructor() {
    this.s3Service = new S3Service();
    this.imageMagickService = new ImageMagickService(this.validExtensions);
    this.imageStore = new ImageStore(this.s3Service);
    this.imageManipulationPackage = new ImageManipulationPackage(this.imageMagickService);
  }

  async upload(eventBody: uploadPayloadSchemaType, context: Context) {
    const file = Buffer.from(eventBody.imageBase64, 'base64');
    const uniqueFilename = `${eventBody.name}-${Date.now()}`;

    const processingTimeRemaining = context.getRemainingTimeInMillis();
    const uploadInfo = await this.imageStore.uploadImage(file, uniqueFilename);
    console.log('Upload processing time in milliseconds: ', processingTimeRemaining - context.getRemainingTimeInMillis());

    return uploadInfo;
  }

  async download(eventBody: downloadPayloadSchemaType, context: Context) {
    const processingTimeRemaining = context.getRemainingTimeInMillis();
    const downloadInfo = await this.imageStore.downloadImage(eventBody.fileName);
    console.log('Download processing time in milliseconds: ', processingTimeRemaining - context.getRemainingTimeInMillis());

    return downloadInfo;
  }

  async downloadByType(eventBody: downloadPayloadSchemaType2, context: Context) {
    const processingTimeRemaining = context.getRemainingTimeInMillis();
    const downloadInfo = await this.imageStore.downloadImage(eventBody.fileName);

    const base64ImageConvered = await this.imageManipulationPackage.convertImage(downloadInfo, eventBody.ext);
    console.log('Download processing time in milliseconds: ',
      processingTimeRemaining - context.getRemainingTimeInMillis());

    return base64ImageConvered;
  }
}
