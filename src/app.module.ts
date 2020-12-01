import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from '@config/app';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [`${appConfig.isDev ? 'src' : 'dist'}/**/*.entity.ts`],
      synchronize: false,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
