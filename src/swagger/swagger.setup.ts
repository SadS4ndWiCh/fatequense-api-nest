import { INestApplication } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { downloadSwaggerFiles } from './download-swagger-files';

export const swaggerSetup = (
  app: INestApplication,
  swaggerConfig: Omit<OpenAPIObject, 'paths'>,
  path: string,
) => {
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(path, app, swaggerDocument);

  if (process.env.NODE_ENV === 'development') {
    downloadSwaggerFiles(process.env.PORT as string, path);
  }
};
