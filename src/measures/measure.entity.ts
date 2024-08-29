import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MeasureTypeEnum } from './measures.dto';

@Entity()
export class Measure {
  @PrimaryGeneratedColumn('uuid')
  measure_uuid: string;

  @Column({ nullable: true })
  image_url: string;

  @Column()
  customer_code: string;

  @Column({ enum: MeasureTypeEnum })
  measure_type: MeasureTypeEnum;

  @Column({ nullable: true })
  measure_value: number;

  @Column({ nullable: true })
  confirmed_value: number;

  @Column({ default: false, type: 'boolean' })
  has_confirmed: boolean;

  @Column({ type: 'timestamp with time zone' })
  measure_datetime: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
