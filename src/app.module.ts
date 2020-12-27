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
import { BcryptModule } from './providers/bcrypt/bcrypt.module';
import { SectionModule } from './modules/section/section.module';
import { MailModule } from './providers/mail/mail.module';
import { SocketioModule } from './providers/socketio/socketio.module';
import { CacheService } from './providers/cache/cache.service';
import { CacheModule } from './providers/cache/cache.module';
import { QueueModule } from './providers/queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    MulterModule.register(),
    DefaultAdminModule,
    UserModule,
    UnitModule,
    AuthModule,
    BcryptModule,
    SectionModule,
    MailModule,
    SocketioModule,
    CacheModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService, CacheService],
})
export class AppModule {}
