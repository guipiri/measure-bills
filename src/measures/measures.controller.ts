import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ConfirmMeasureDto, CreateMeasureDto } from './measures.dto';
import { MeasuresService } from './measures.service';

@Controller()
export class MeasuresController {
  constructor(private readonly uploadsService: MeasuresService) {}

  @Post('uploads')
  create(@Body() createMeasureDto: CreateMeasureDto) {
    return this.uploadsService.create(createMeasureDto);
  }

  @Get(':customerCode/list')
  findByCustomerCode() {
    return this.uploadsService.findByCustomerCode();
  }

  @Patch('confirm')
  update(@Body() confirmMeasureDto: ConfirmMeasureDto) {
    return this.uploadsService.confirm(confirmMeasureDto);
  }
}
