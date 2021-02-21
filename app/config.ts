const config = {
  bucketName: process.env.S3_BUCKET || 'imageStore',
  region: process.env.S3_REGION || 'us-east-1',
  endpoint: process.env.S3_ENDPOINT || 'http://localhost:4566',
};

export { config };
