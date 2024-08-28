import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ImagesService {
  private storageFolder = join(__dirname, '..', 'storage');

  base64ToJPEG(base64: string, measure_uuid: string) {
    try {
      const buffer = Buffer.from(base64, 'base64');
      if (!existsSync(this.storageFolder)) {
        mkdirSync(this.storageFolder);
      }
      const filePath = this.storageFolder + `/${measure_uuid}.jpeg`;

      writeFileSync(filePath, buffer, {
        encoding: 'base64',
      });
      return filePath;
    } catch (err) {
      console.error(err);
    }
  }

  findOne(measure_uuid: number) {
    return `This action returns a #${measure_uuid} image`;
  }
}
