/* eslint-disable no-unused-vars */
export interface IImageStore {
  downloadImage(fileName: string): Promise<any>;
  // getImage(name: string): Promise<any[]>;
  uploadImage(file: Buffer, name: string): Promise<any>;
}
