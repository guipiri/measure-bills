import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { MeasureStatusEnum, MeasureTypeEnum } from './measures.dto';

export class Measure {
  @PrimaryGeneratedColumn('uuid')
  measure_id: string;

  @Column()
  image: string;

  @Column()
  customer_code: string;

  @Column({ enum: MeasureTypeEnum })
  measure_type: MeasureTypeEnum;

  @Column()
  measure_value: number;

  @Column()
  confirmed_value: number;

  @Column({ default: 'MEASURED', enum: MeasureStatusEnum })
  status: MeasureStatusEnum;

  @Column({ type: 'timestamp with time zone' })
  measure_datetime: Timestamp;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Timestamp;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Timestamp;
}
