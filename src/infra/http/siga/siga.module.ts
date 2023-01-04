import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { ApiService } from './api/api.service';
import { SigaController } from './controllers/siga.controller';

import { LoginWithSiga } from '@application/use-cases/login-with-siga';
import { GetStudentProfile } from '@application/use-cases/get-student-profile';
import { GetStudentPartialGrade } from '@application/use-cases/get-student-partial-grade';
import { GetNotices } from '@application/use-cases/get-notices';
import { GetStudentPartialAbsences } from '@application/use-cases/get-student-partial-absences';
import { GetStudentHistory } from '@application/use-cases/get-student-history';
import { GetStudentSchedule } from '@application/use-cases/get-student-schedule';

import { ProfileScrapper } from '@application/scrappers/profile.scrapper';
import { PartialGradeScrapper } from '@application/scrappers/partialGrade.scrapper';
import { PartialAbsencesScrapper } from '@application/scrappers/partialAbsences.scrapper';
import { HistoryScrapper } from '@application/scrappers/history.scrapper';
import { ScheduleScrapper } from '@application/scrappers/schedule.scrapper';
import { NoticesScrapper } from '@application/scrappers/notices.scrapper';

import { JWT } from '@helpers/jwt';
import { GXState } from '@helpers/gxstate';

import jwtConfig from '@config/jwt.config';

@Module({
  imports: [
    ...jwtConfig.asProvider().imports,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 15,
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
  ],
})
export class SigaModule {}
