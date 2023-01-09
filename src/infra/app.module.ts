import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { SigaModule } from './http/siga/siga.module';

import jwtConfiguration from '../config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfiguration],
      cache: true,
    }),
    SigaModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 15,
    }),
  ],
})
export class AppModule {}
