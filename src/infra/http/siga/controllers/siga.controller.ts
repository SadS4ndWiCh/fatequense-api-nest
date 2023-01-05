import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { Cache } from 'cache-manager';

import { SigaLoginBody } from '../dtos/siga-login-body';
import { LoginWithSiga } from '@application/use-cases/login-with-siga';
import { GetStudentProfile } from '@application/use-cases/get-student-profile';
import { ApiService } from '../api/api.service';
import { GetStudentPartialGrade } from '@application/use-cases/get-student-partial-grade';
import { GetStudentPartialAbsences } from '@application/use-cases/get-student-partial-absences';
import { GetStudentHistory } from '@application/use-cases/get-student-history';
import { GetStudentSchedule } from '@application/use-cases/get-student-schedule';
import { GetNotices } from '@application/use-cases/get-notices';
import { ApiTags } from '@nestjs/swagger';

const THREE_HOURS_IN_SECONDS = 1000 * 60 * 3;

@ApiTags('Estudante')
@Controller()
export class SigaController {
  constructor(
    private api: ApiService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private loginWithSiga: LoginWithSiga,
    private getStudentProfile: GetStudentProfile,
    private getStudentPartialGrade: GetStudentPartialGrade,
    private getStudentPartialAbsences: GetStudentPartialAbsences,
    private getStudentHistory: GetStudentHistory,
    private getStudentSchedule: GetStudentSchedule,
    private getNotices: GetNotices,
  ) {}

  @SkipThrottle()
  @Post('/login')
  async login(@Body() body: SigaLoginBody) {
    const { username, password } = body;

    const token = await this.loginWithSiga.excute({ username, password });

    return { token };
  }

  @Get('/student/profile')
  async getStudentProfileContent(
    @Headers('authorization') authorization: string,
  ) {
    const cacheKey = `${authorization}-profile`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return { profile: cached };
    }
    const { cookie } = this.api.validateAuthorization(authorization);

    const profile = await this.getStudentProfile.execute({ cookie });
    await this.cacheManager.set(cacheKey, profile, THREE_HOURS_IN_SECONDS);

    return { profile };
  }

  @Get('/student/partial-grade')
  async getStudentPartialGradeContent(
    @Headers('authorization') authorization: string,
  ) {
    const cacheKey = `${authorization}-partial-grade`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return { partialGrade: cached };
    }
    const { cookie } = this.api.validateAuthorization(authorization);

    const partialGrade = await this.getStudentPartialGrade.execute({
      cookie,
    });
    await this.cacheManager.set(cacheKey, partialGrade, THREE_HOURS_IN_SECONDS);

    return { partialGrade };
  }

  @Get('/student/partial-absences')
  async getStudentPartialAbsencesContent(
    @Headers('authorization') authorization: string,
  ) {
    const cacheKey = `${authorization}-partial-absences`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return { partialAbsences: cached };
    }
    const { cookie } = this.api.validateAuthorization(authorization);

    const partialAbsences = await this.getStudentPartialAbsences.execute({
      cookie,
    });
    await this.cacheManager.set(
      cacheKey,
      partialAbsences,
      THREE_HOURS_IN_SECONDS,
    );

    return { partialAbsences };
  }

  @Get('/student/history')
  async getStudentHistoryContent(
    @Headers('authorization') authorization: string,
  ) {
    const cacheKey = `${authorization}-history`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return { history: cached };
    }
    const { cookie } = this.api.validateAuthorization(authorization);

    const history = await this.getStudentHistory.execute({ cookie });
    await this.cacheManager.set(cacheKey, history, THREE_HOURS_IN_SECONDS);

    return { history };
  }

  @Get('/student/schedule')
  async getStudentScheduleContent(
    @Headers('authorization') authorization: string,
  ) {
    const cacheKey = `${authorization}-schedule`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return { schedule: cached };
    }
    const { cookie } = this.api.validateAuthorization(authorization);

    const schedule = await this.getStudentSchedule.execute({ cookie });
    await this.cacheManager.set(cacheKey, schedule, THREE_HOURS_IN_SECONDS);

    return { schedule };
  }

  @Get('/student/notices')
  async getNoticesContent(@Headers('authorization') authorization: string) {
    const cacheKey = `${authorization}-notices`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return { notices: cached };
    }
    const { cookie } = this.api.validateAuthorization(authorization);

    const notices = await this.getNotices.execute({ cookie });
    await this.cacheManager.set(cacheKey, notices, THREE_HOURS_IN_SECONDS);

    return { notices };
  }
}
