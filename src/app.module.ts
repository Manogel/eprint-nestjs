import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { DefaultAdminModule } from 'nestjs-admin';
import { UnitModule } from './modules/unit/unit.module';
import { AuthModule } from './modules/auth/auth.module';
import { BcryptModule } from './modules/bcrypt/bcrypt.module';
import { SectionModule } from './modules/section/section.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    MulterModule.register(),
    DefaultAdminModule,
    UserModule,
    UnitModule,
    AuthModule,
    BcryptModule,
    SectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
