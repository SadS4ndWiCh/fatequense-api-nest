import { Module, CacheModule } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { ApiService } from './api/api.service';
import { AuthCacheInterceptor } from './api/cache.interceptor';
import { SigaController } from './controllers/siga.controller';

import {
  LoginWithSiga,
  GetStudentProfile,
  GetStudentPartialGrade,
  GetNotices,
  GetStudentPartialAbsences,
  GetStudentHistory,
  GetStudentSchedule,
} from '@application/use-cases';

import {
  ProfileScrapper,
  PartialAbsencesScrapper,
  PartialGradeScrapper,
  HistoryScrapper,
  ScheduleScrapper,
  NoticesScrapper,
} from '@application/scrappers';

import { JWT } from '@helpers/jwt';
import { GXState } from '@helpers/gxstate';

import jwtConfig from '@config/jwt.config';

@Module({
  imports: [
    ...jwtConfig.asProvider().imports,
    CacheModule.register({
      ttl: 60,
      max: 20,
    }),
  ],
  controllers: [SigaController],
  providers: [
    JWT,
    GXState,
    ApiService,
    ProfileScrapper,
    PartialGradeScrapper,
    PartialAbsencesScrapper,
    ScheduleScrapper,
    HistoryScrapper,
    NoticesScrapper,
    LoginWithSiga,
    GetStudentProfile,
    GetStudentPartialGrade,
    GetStudentPartialAbsences,
    GetStudentHistory,
    GetStudentSchedule,
    GetNotices,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthCacheInterceptor,
    },
  ],
})
export class SigaModule {}
