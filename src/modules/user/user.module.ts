import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import { UserAdmin } from './entities/user.admin';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    DefaultAdminModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    this.adminSite.register('User', UserAdmin);
  }
}
