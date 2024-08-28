import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeminiaiService } from 'src/geminiai/geminiai.service';
import { Repository } from 'typeorm';
import { Measure } from './measure.entity';
import {
  ConfirmMeasureDto,
  CreateMeasureDto,
  MeasureTypeEnum,
} from './measures.dto';

@Injectable()
export class MeasuresService {
  constructor(
    @InjectRepository(Measure) private measureRepository: Repository<Measure>,
    @Inject() private geminiAI: GeminiaiService,
  ) {}

  async create({
    customer_code,
    image,
    measure_datetime,
    measure_type,
  }: CreateMeasureDto) {
    const { total: measure_value } = await this.geminiAI.run(image);

    const { measure_uuid } = await this.measureRepository.save({
      image_url: 'alguma url aqui',
      customer_code,
      measure_datetime,
      measure_type,
      measure_value: Number(measure_value),
    });

    return { measure_value, measure_uuid, image_url: '' };
  }

  async findAllMeasuresByCustomerCode(
    customer_code: string,
    measure_type?: MeasureTypeEnum,
  ) {
    const measures = this.measureRepository.find({
      where: {
        customer_code,
        measure_type: measure_type
          ? MeasureTypeEnum[measure_type.toUpperCase()]
          : undefined,
      },
    });
    return { customer_code, measures };
  }

  confirm(confirmMeasureDto: ConfirmMeasureDto) {
    return `This action updates a measure ${confirmMeasureDto}`;
  }
}
