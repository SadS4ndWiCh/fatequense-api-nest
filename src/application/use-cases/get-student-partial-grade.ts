import { Injectable } from '@nestjs/common';

import { InvalidCookie } from './errors/invalid-cookie';

import { ApiService } from '../../infra/http/siga/api/api.service';
import { PartialGradeScrapper } from '../../application/scrappers/partialGrade.scrapper';
// import { JWT } from '@helpers/jwt';

interface GetStudentProfileRequest {
  cookie: string;
}

@Injectable()
export class GetStudentPartialGrade {
  constructor(
    private api: ApiService,
    private partialGradeScrapper: PartialGradeScrapper,
  ) {}

  async execute({ cookie }: GetStudentProfileRequest) {
    const { data, success } = await this.api.get({
      route: 'partialGrade',
      headers: {
        cookie,
      },
    });

    if (!success) {
      throw new InvalidCookie();
    }

    return this.partialGradeScrapper.scrap(data);
  }
}
