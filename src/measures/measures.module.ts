import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measure } from './measure.entity';
import { MeasuresController } from './measures.controller';
import { MeasuresService } from './measures.service';

@Module({
  controllers: [MeasuresController],
  providers: [MeasuresService],
  imports: [TypeOrmModule.forFeature([Measure])],
})
export class MeasuresModule {}
