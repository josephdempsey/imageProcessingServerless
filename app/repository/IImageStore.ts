/* eslint-disable no-unused-vars */
export interface IImageStore {
  // getImage(name: string): Promise<any[]>;
  uploadImage(file: Buffer, name: string): Promise<any>;
}
