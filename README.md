# imageProcessingServerless

Install Docker
Install serverless
docker-compose up -d
docker logs imageprocessingserverless_localstack_1
wait for localstack to be ready




# Other Considerations
Batching: via endpoint request that takes an array of base64 encoded images vs serverless approach to concurrent lambdas for each image request. 

CDN/Cloudfront: Could have lambda that immediately triggers after upload to s3. Then converts image to all required types and sizes and stores in CDN. Then when image requested it could be served from an edge location, would be highly preformat but would take up more storage space. Normally storage is cheaper than network but depends on the need/use case.

Another future consideration if the user was uploading an image and wanting to manipulate it immediately and get back the converted image. We could run the conversion as a lambda edge function, return the converted image and then save both. 