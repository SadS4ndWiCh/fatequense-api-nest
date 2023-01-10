import { Injectable } from '@nestjs/common';

import { InvalidCookie } from './errors/invalid-cookie';

import { ApiService } from '../../infra/http/siga/api/api.service';
import { HistoryScrapper } from '../../application/scrappers/history.scrapper';

interface GetStudentProfileRequest {
  cookie: string;
}

@Injectable()
export class GetStudentHistory {
  constructor(
    private api: ApiService,
    private historyScrapper: HistoryScrapper,
  ) {}

  async execute({ cookie }: GetStudentProfileRequest) {
    const { data, success } = await this.api.get({
      route: 'history',
      headers: { cookie },
    });

    if (!success) {
      throw new InvalidCookie();
    }

    return this.historyScrapper.scrap(data);
  }
}
