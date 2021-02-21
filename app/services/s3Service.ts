import { S3 } from 'aws-sdk';
import { IImageStore } from '../repository/IImageStore';
import { config } from '../config';

const {
  bucketName,
  region,
  endpoint,
} = config;

export class S3Service implements IImageStore {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      region,
      endpoint,
    });
  }

  async uploadImage(file: Buffer, name: string): Promise<any> {
    try {
      const uploadInfo = await this.s3.upload({ Body: file, Bucket: bucketName, Key: name }).promise();

      return uploadInfo;
    } catch (error) {
      console.log(error, `bucket: ${bucketName}, Key: ${name}`);

      throw error;
    }
  }

  async downloadImage(fileName: string): Promise<any> {
    try {
      const downloadInfo = await this.s3.getObject({ Bucket: bucketName, Key: fileName }).promise();

      if (!downloadInfo.Body) {
        throw new Error('Image does not exist');
      }

      return downloadInfo.Body;
    } catch (error) {
      console.log(error, `bucket: ${bucketName}, Key: ${fileName}`);

      throw error;
    }
  }
}
