import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeminiaiService } from 'src/geminiai/geminiai.service';
import { Measure } from './measure.entity';
import { MeasuresController } from './measures.controller';
import { MeasuresService } from './measures.service';

@Module({
  controllers: [MeasuresController],
  providers: [MeasuresService, GeminiaiService],
  imports: [TypeOrmModule.forFeature([Measure])],
})
export class MeasuresModule {}
