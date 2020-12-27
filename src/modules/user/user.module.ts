import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import { UserAdmin } from './entities/user.admin';
import { BcryptModule } from '@providers/bcrypt/bcrypt.module';
import { QueueModule } from '@providers/queue/queue.module';

@Module({
  imports: [
    BcryptModule,
    TypeOrmModule.forFeature([User, UserRepository]),
    DefaultAdminModule,
    QueueModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule.forFeature([User, UserRepository])],
})
export class UserModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    this.adminSite.register('User', UserAdmin);
  }
}
