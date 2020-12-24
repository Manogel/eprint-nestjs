import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export abstract class MyBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    required: false,
  })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @Column({ nullable: true })
  deleted_at?: Date;
}
