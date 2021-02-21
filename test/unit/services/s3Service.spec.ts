import { S3Service } from '../../../app/services/s3Service';
import { config } from '../../../app/config';

const mS3Instance = {
  upload: jest.fn().mockReturnThis(),
  getObject: jest.fn().mockReturnThis(),
  promise: jest.fn(),
};

jest.mock('aws-sdk', () => ({ S3: jest.fn(() => mS3Instance) }));

describe('s3 Service', () => {
  it('should throw if upload fails', async () => {
    const error = new Error('upload failed');
    mS3Instance.promise.mockRejectedValueOnce(error);
    const s3Service = new S3Service();
    try {
      await s3Service.uploadImage(Buffer.from('Image'), 'fileName');
    } catch (err) {
      expect(err).toEqual(error);
    }

    expect(mS3Instance.upload).toBeCalledWith({ Bucket: config.bucketName, Key: 'fileName', Body: Buffer.from('Image') });
  });

  it('should upload and return upload information', async () => {
    mS3Instance.promise.mockResolvedValueOnce('S3 Upload Information');
    const s3Service = new S3Service();
    const actual = await s3Service.uploadImage(Buffer.from('Image'), 'fileName');
    expect(actual).toEqual('S3 Upload Information');
    expect(mS3Instance.upload).toBeCalledWith({ Bucket: config.bucketName, Key: 'fileName', Body: Buffer.from('Image') });
  });

  it('should throw if download fails', async () => {
    const error = new Error('download failed');
    mS3Instance.promise.mockRejectedValueOnce(error);
    const s3Service = new S3Service();
    try {
      await s3Service.downloadImage('fileName');
    } catch (err) {
      expect(err).toEqual(error);
    }

    expect(mS3Instance.getObject).toBeCalledWith({ Bucket: config.bucketName, Key: 'fileName' });
  });

  it('should upload and return upload information', async () => {
    mS3Instance.promise.mockResolvedValueOnce('S3 Upload Information');
    const s3Service = new S3Service();
    const actual = await s3Service.uploadImage(Buffer.from('Image'), 'fileName');
    expect(actual).toEqual('S3 Upload Information');
    expect(mS3Instance.getObject).toBeCalledWith({ Bucket: config.bucketName, Key: 'fileName' });
  });

  it('should throw if image does not exist', async () => {
    mS3Instance.promise.mockResolvedValueOnce({
      Body: '',
    });
    const s3Service = new S3Service();
    try {
      await s3Service.downloadImage('fileName');
    } catch (err) {
      expect(err.message).toEqual('Image does not exist');
    }

    expect(mS3Instance.getObject).toBeCalledWith({ Bucket: config.bucketName, Key: 'fileName' });
  });
});
