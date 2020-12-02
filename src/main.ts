import appConfig from '@config/app';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(appConfig.port);
  await app.listen(appConfig.port || 3000);
}
bootstrap();
