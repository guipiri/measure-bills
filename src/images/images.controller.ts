import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':measure_uuid')
  findOne(@Param('measure_uuid') measure_uuid: string, @Res() res: Response) {
    const file = createReadStream(
      join(__dirname, '..', 'storage', measure_uuid),
    );
    file.pipe(res);
  }
}
