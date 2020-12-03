import { Exclude } from 'class-transformer';
import { MyBaseEntity } from '@utils/base_entity';

import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends MyBaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty({
    required: false,
    enum: ['ADMIN', 'USER'],
  })
  @Column({ default: 'USER', enum: ['USER', 'ADMIN'] })
  profile?: string;

  @ApiProperty()
  @Exclude()
  @Column()
  password: string;

  @ApiProperty({
    required: false,
  })
  @Column({ nullable: true })
  avatar?: string;
}
