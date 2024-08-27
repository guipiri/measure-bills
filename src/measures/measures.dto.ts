import {
  IsBase64,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export enum MeasureTypeEnum {
  GAS = 'GAS',
  WATER = 'WATER',
}

export enum MeasureStatusEnum {
  CONFIRMED = 'CONFIRMED',
  MEASURED = 'MEASURED',
}

export class CreateMeasureDto {
  @IsBase64()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  customer_code: string;

  @IsEnum(MeasureTypeEnum)
  measure_type: MeasureTypeEnum;

  @IsDateString()
  measure_datetime: Date;
}

export class ConfirmMeasureDto {}
