/* eslint-disable import/prefer-default-export */
import { IImageStore } from './IImageStore';

export class ImageStore implements IImageStore {
    private imageStoreService: IImageStore;

    constructor(imageStoreService: IImageStore) {
      this.imageStoreService = imageStoreService;
    }

    async uploadImage(file: Buffer, name: string): Promise<any> {
      return this.imageStoreService.uploadImage(file, name);
    }
}
