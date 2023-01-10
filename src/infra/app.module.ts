import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';

import { SigaModule } from './http/siga/siga.module';

import jwtConfiguration from '../config/jwt.config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger', 'static'),
      serveRoot: '/docs', //process.env.NODE_ENV === 'development' ? '/' : '/docs',
    }),
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
