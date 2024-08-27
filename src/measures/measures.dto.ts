import { IsBase64, IsDateString, IsEnum, IsString } from 'class-validator';

export enum MeasureTypeEnum {
  GAS,
  WATER,
}

export enum MeasureStatusEnum {
  CONFIRMED,
  MEASURED,
}

export class CreateMeasureDto {
  @IsBase64()
  image: string;

  @IsString()
  customer_code: string;

  @IsEnum(MeasureTypeEnum)
  measure_type: MeasureTypeEnum;

  @IsDateString()
  measure_datetime: Date;
}

export class ConfirmMeasureDto {}
