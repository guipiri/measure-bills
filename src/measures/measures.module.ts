import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeminiaiService } from 'src/geminiai/geminiai.service';
import { ImagesService } from 'src/images/images.service';
import { Measure } from './measure.entity';
import { MeasuresController } from './measures.controller';
import { MeasuresService } from './measures.service';

@Module({
  controllers: [MeasuresController],
  providers: [MeasuresService, GeminiaiService, ImagesService],
  imports: [TypeOrmModule.forFeature([Measure])],
})
export class MeasuresModule {}
