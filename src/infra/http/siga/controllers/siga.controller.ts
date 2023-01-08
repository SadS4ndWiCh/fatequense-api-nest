import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SigaLoginBody } from '../dtos/siga-login-body';
import { ApiService } from '../api/api.service';

import {
  LoginWithSiga,
  GetStudentProfile,
  GetStudentPartialGrade,
  GetNotices,
  GetStudentPartialAbsences,
  GetStudentHistory,
  GetStudentSchedule,
} from '@application/use-cases';

@ApiTags('Estudante')
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

    const notices = await this.getNotices.execute({ cookie });

    return { notices };
  }
}
