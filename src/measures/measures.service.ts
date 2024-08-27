import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Measure } from './measure.entity';
import { ConfirmMeasureDto, CreateMeasureDto } from './measures.dto';

@Injectable()
export class MeasuresService {
  constructor(
    @InjectRepository(Measure) private measureRepository: Repository<Measure>,
  ) {}

  create(createUploadDto: CreateMeasureDto) {
    console.log(createUploadDto);
    return 'This action adds a new upload';
  }

  findByCustomerCode() {
    return `This action returns all uploads`;
  }

  confirm(confirmMeasureDto: ConfirmMeasureDto) {
    return `This action updates a measure ${confirmMeasureDto}`;
  }
}
