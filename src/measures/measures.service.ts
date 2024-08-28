import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    private readonly geminiAIService: GeminiaiService,
    private readonly configService: ConfigService,
  ) {}

  async create(
    { customer_code, image, measure_datetime, measure_type }: CreateMeasureDto,
    host: string,
  ) {
    // Se já realizada a leitura no mês disparar: throw new HttpException(undefined, HttpStatus.CONFLICT);

    const { measure_uuid } = await this.measureRepository.save({
      customer_code,
      measure_datetime,
      measure_type,
    });

    const { total: measure_value } = await this.geminiAIService.run(
      image,
      measure_uuid,
    );

    const image_url = `http://${host}/images/${measure_uuid}.jpeg`;

    await this.measureRepository.update(
      { measure_uuid },
      {
        measure_value: Number(measure_value),
        image_url,
      },
    );

    return { measure_value, measure_uuid, image_url };
  }

  async findAllMeasuresByCustomerCode(
    customer_code: string,
    measureType?: MeasureTypeEnum,
  ) {
    if (measureType && !MeasureTypeEnum[measureType.toUpperCase()]) {
      throw new BadRequestException();
    }

    const measures = await this.measureRepository.find({
      where: {
        customer_code,
        measure_type: measureType && MeasureTypeEnum[measureType.toUpperCase()],
      },
    });

    if (measures.length === 0) throw new NotFoundException();

    return { customer_code, measures };
  }

  confirm(confirmMeasureDto: ConfirmMeasureDto) {
    return `This action updates a measure ${confirmMeasureDto}`;
  }
}
