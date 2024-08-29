import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeminiaiService } from 'src/geminiai/geminiai.service';
import { compareMonths } from 'src/utils/compareMonths';
import { generateImageUrl } from 'src/utils/generateImageUrl';
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
  ) {}

  async create(
    { customer_code, image, measure_datetime, measure_type }: CreateMeasureDto,
    host: string,
  ) {
    /* Get all the measures by customer code and measure type 
    to check if already exists a measure in the same month */
    const measuresByCustomerAndType = await this.measureRepository.find({
      where: { customer_code, measure_type },
    });

    if (measuresByCustomerAndType.length !== 0) {
      const measuresDatetimes = measuresByCustomerAndType.map(
        (measure) => measure.measure_datetime,
      );

      /* Function to compare if the new measure datetime and
      the others measures from the same customer and type */
      const existMeasuresInSameMonth = compareMonths(
        new Date(measure_datetime),
        measuresDatetimes,
      );

      //If already exists a measure with the same type, month and user, throw error
      if (existMeasuresInSameMonth) throw new ConflictException();
    }

    //Ready for create a new measure now
    const { measure_uuid } = await this.measureRepository.save({
      customer_code,
      measure_datetime,
      measure_type,
    });

    /* Call this function to use Geminiai to read 
    the base64 image and return the value bill */
    const { total: measure_value } = await this.geminiAIService.run(
      image,
      measure_uuid,
    );

    // Generate url for the image exposed from images module
    const image_url = generateImageUrl(host, measure_uuid);

    // Update database with measured value by Gemini and image url
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

  async confirm({ measure_uuid, confirmed_value }: ConfirmMeasureDto) {
    const measureWithProvidedUuid = await this.measureRepository.findOne({
      where: { measure_uuid },
    });

    if (!measureWithProvidedUuid) throw new NotFoundException();
    if (measureWithProvidedUuid.has_confirmed) throw new ConflictException();
    await this.measureRepository.update(
      { measure_uuid },
      { confirmed_value, has_confirmed: true },
    );
    return { success: true };
  }
}
