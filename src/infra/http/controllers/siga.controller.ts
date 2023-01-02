import { Body, Controller, Get, Headers, Post } from '@nestjs/common';

import { SigaLoginBody } from '../dtos/siga-login-body';
import { LoginWithSiga } from '@application/use-cases/login-with-siga';
import { GetStudentProfile } from '@application/use-cases/get-student-profile';
import { ApiService } from '../siga/api/api.service';
import { GetStudentPartialGrade } from '@application/use-cases/get-student-partial-grade';
import { GetStudentPartialAbsences } from '@application/use-cases/get-student-partial-absences';
import { GetStudentHistory } from '@application/use-cases/get-student-history';
import { GetStudentSchedule } from '@application/use-cases/get-student-schedule';
import { GetNotices } from '@application/use-cases/get-notices';

@Controller()
export class SigaController {
  constructor(
    private api: ApiService,
    private loginWithSiga: LoginWithSiga,
    private getStudentProfile: GetStudentProfile,
    private getStudentPartialGrade: GetStudentPartialGrade,
    private getStudentPartialAbsences: GetStudentPartialAbsences,
    private getStudentHistory: GetStudentHistory,
    private getStudentSchedule: GetStudentSchedule,
    private getNotices: GetNotices,
  ) {}
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
    const { cookie } = this.api.validateAuthorization(authorization);

    const profile = await this.getStudentProfile.execute({ cookie });

    return { profile };
  }

  @Get('/student/partial-grade')
  async getStudentPartialGradeContent(
    @Headers('authorization') authorization: string,
  ) {
    const { cookie } = this.api.validateAuthorization(authorization);

    const partialGrade = await this.getStudentPartialGrade.execute({
      cookie,
    });

    return { partialGrade };
  }

  @Get('/student/partial-absences')
  async getStudentPartialAbsencesContent(
    @Headers('authorization') authorization: string,
  ) {
    const { cookie } = this.api.validateAuthorization(authorization);

    const partialAbsences = await this.getStudentPartialAbsences.execute({
      cookie,
    });

    return { partialAbsences };
  }

  @Get('/student/history')
  async getStudentHistoryContent(
    @Headers('authorization') authorization: string,
  ) {
    const { cookie } = this.api.validateAuthorization(authorization);

    const history = await this.getStudentHistory.execute({ cookie });

    return { history };
  }

  @Get('/student/schedule')
  async getStudentScheduleContent(
    @Headers('authorization') authorization: string,
  ) {
    const { cookie } = this.api.validateAuthorization(authorization);

    const schedule = await this.getStudentSchedule.execute({ cookie });

    return { schedule };
  }

  @Get('/student/notices')
  async getNoticesContent(@Headers('authorization') authorization: string) {
    const { cookie } = this.api.validateAuthorization(authorization);

    const schedule = await this.getNotices.execute({ cookie });

    return { schedule };
  }
}
