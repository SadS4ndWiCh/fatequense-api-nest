import { Module } from '@nestjs/common';
import { SigaController } from './controllers/siga.controller';

@Module({
  controllers: [SigaController],
})
export class AppModule {}
