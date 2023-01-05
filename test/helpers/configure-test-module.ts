import { Test } from '@nestjs/testing';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

import { SigaModule } from '@infra/http/siga/siga.module';
import jwtConfiguration from '@config/jwt.config';

export const configureTestModule = async () => {
  return await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        load: [jwtConfiguration],
        cache: true,
      }),
      SigaModule,
      ThrottlerModule.forRoot({
        ttl: 60,
        limit: 2,
      }),
    ],
  }).compile();
};
