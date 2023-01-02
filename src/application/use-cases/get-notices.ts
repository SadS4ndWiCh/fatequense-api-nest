import { Injectable } from '@nestjs/common';

import { InvalidCookie } from './errors/invalid-cookie';

import { ApiService } from '@infra/http/siga/api/api.service';
import { NoticesScrapper } from '@application/scrappers/notices.scrapper';

interface GetStudentProfileRequest {
  cookie: string;
}

@Injectable()
export class GetNotices {
  constructor(
    private api: ApiService,
    private noticesScrapper: NoticesScrapper,
  ) {}

  async execute({ cookie }: GetStudentProfileRequest) {
    const { data, success } = await this.api.get({
      route: 'home',
      headers: { cookie },
    });

    if (!success) {
      throw new InvalidCookie();
    }

    return this.noticesScrapper.scrap(data);
  }
}
