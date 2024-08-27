import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { MeasureStatusEnum, MeasureTypeEnum } from './measures.dto';

@Entity()
export class Measure {
  @PrimaryGeneratedColumn('uuid')
  measure_uuid: string;

  @Column()
  image: string;

  @Column()
  customer_code: string;

  @Column({ enum: MeasureTypeEnum })
  measure_type: MeasureTypeEnum;

  @Column({ nullable: true })
  measure_value: number;

  @Column({ nullable: true })
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
