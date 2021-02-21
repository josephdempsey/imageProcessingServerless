import { IImageManipulationPackage } from './IImageManipulationPackage';

export class ImageManipulationPackage implements IImageManipulationPackage {
    private imageManipulationService: IImageManipulationPackage;

    constructor(imageManipulationService: IImageManipulationPackage) {
      this.imageManipulationService = imageManipulationService;
    }

    async convertImage(file: Buffer, ext: string): Promise<any> {
      return this.imageManipulationService.convertImage(file, ext);
    }
}
