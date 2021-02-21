import sharp, { FormatEnum } from 'sharp';
import { IImageManipulationPackage } from '../repository/IImageManipulationPackage';

// Note: This could be extracted into a NPM package but seeing as im using sharp already
// I have added this as service that can be switched out for any image manipulation package
export class ImageMagickService implements IImageManipulationPackage {
  private imageConverted: Buffer | null;

  validExtensions: Array<string>;

  constructor(validExtensions: Array<string>) {
    this.imageConverted = null;
    this.validExtensions = validExtensions;
  }

  async convertImage(file: Buffer, ext: keyof FormatEnum): Promise<any> {
    if (!this.validExtensions.includes(ext)) {
      return new Error('Invalid image extension, cannot convert');
    }

    try {
      this.imageConverted = await sharp(file)
        .toFormat(ext)
        .toBuffer();

      return this.imageConverted.toString('base64');
    } catch (error) {
      console.log(error, `Failed to convert image to ext: ${ext}`);

      throw error;
    }
  }
}
