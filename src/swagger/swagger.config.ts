import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Fatequense API')
  .setDescription(
    'API para acessar informações de estudantes da faculdade Fatec',
  )
  .setVersion('v2.0.0')
  .build();
