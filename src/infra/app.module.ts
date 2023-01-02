import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SigaModule } from './http/siga/siga.module';

import jwtConfiguration from '@config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfiguration],
      cache: true,
    }),
    SigaModule,
  ],
})
export class AppModule {}
