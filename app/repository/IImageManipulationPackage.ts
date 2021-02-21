/* eslint-disable no-unused-vars */
export interface IImageManipulationPackage {
  convertImage(file: Buffer, ext: string): Promise<any>;
}
