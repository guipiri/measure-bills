import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ConfirmMeasureDto,
  CreateMeasureDto,
  MeasureTypeEnum,
} from './measures.dto';
import { MeasuresService } from './measures.service';

@Controller()
export class MeasuresController {
  constructor(private readonly uploadsService: MeasuresService) {}

  @Post('upload')
  async create(@Body() createMeasureDto: CreateMeasureDto) {
    return await this.uploadsService.create(createMeasureDto);
  }

  @Get(':customerCode/list')
  findByCustomerCode(
    @Param('customerCode') customer_code: string,
    @Query('measure_type') measure_type: MeasureTypeEnum,
  ) {
    return this.uploadsService.findAllMeasuresByCustomerCode(
      customer_code,
      measure_type,
    );
  }

  @Patch('confirm')
  update(@Body() confirmMeasureDto: ConfirmMeasureDto) {
    return this.uploadsService.confirm(confirmMeasureDto);
  }
}
