import { MyBaseEntity } from '@utils/base_entity';

import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('units')
export class Unit extends MyBaseEntity {
  @ApiProperty()
  @Column()
  name: string;
}
