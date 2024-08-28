import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception/http-exception.filter';
import {
  ConfirmMeasureDto,
  CreateMeasureDto,
  MeasureTypeEnum,
} from './measures.dto';
import { MeasuresService } from './measures.service';

@Controller()
@UseFilters(new HttpExceptionFilter())
export class MeasuresController {
  constructor(private readonly uploadsService: MeasuresService) {}

  @Post('upload')
  async create(
    @Body() createMeasureDto: CreateMeasureDto,
    @Headers('host') host: string,
  ) {
    return await this.uploadsService.create(createMeasureDto, host);
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
