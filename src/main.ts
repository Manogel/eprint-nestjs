import 'express-async-errors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { getAsyncAppConfig } from '@config/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = getAsyncAppConfig();
  const PORT = appConfig.port;
  const APP_NAME = process.env.npm_package_name;
  const APP_VERSION = process.env.npm_package_version;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  const swaggerOptions = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`The ${APP_NAME} API description`)
    .setVersion(APP_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  await app.listen(PORT, () => {
    console.log(`🚀 App is running on port ${PORT}`);
  });
}
bootstrap();
