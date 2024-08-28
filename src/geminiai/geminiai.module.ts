import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ImagesService } from 'src/images/images.service';
import { GeminiaiService } from './geminiai.service';

@Module({
  providers: [GeminiaiService, ConfigService, ImagesService],
  exports: [GeminiaiService],
})
export class GeminiaiModule {}
