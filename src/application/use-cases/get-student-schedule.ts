import { Injectable } from '@nestjs/common';

import { InvalidCookie } from './errors/invalid-cookie';

import { ApiService } from '@infra/http/siga/api/api.service';
import { ScheduleScrapper } from '@application/scrappers/schedule.scrapper';

interface GetStudentProfileRequest {
  cookie: string;
}

@Injectable()
export class GetStudentSchedule {
  constructor(
    private api: ApiService,
    private scheduleScrapper: ScheduleScrapper,
  ) {}

  async execute({ cookie }: GetStudentProfileRequest) {
    const { data, success } = await this.api.get({
      route: 'schedule',
      headers: { cookie },
    });

    if (!success) {
      throw new InvalidCookie();
    }

    return this.scheduleScrapper.scrap(data);
  }
}
