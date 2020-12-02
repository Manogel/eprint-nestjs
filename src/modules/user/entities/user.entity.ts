import { Exclude } from 'class-transformer';
import { MyBaseEntity } from '@utils/base_entity';

import { Entity, Column } from 'typeorm';

@Entity('users')
export class User extends MyBaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  profile: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  avatar: string;
}
