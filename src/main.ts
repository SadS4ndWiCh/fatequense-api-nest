import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './infra/app.module';
import { swaggerConfig } from './swagger/swagger.config';
import { swaggerSetup } from './swagger/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerSetup(app, swaggerConfig, 'docs');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
