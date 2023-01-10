import { Injectable } from '@nestjs/common';

import { InvalidCookie } from './errors/invalid-cookie';

import { ApiService } from '../../infra/http/siga/api/api.service';
import { PartialAbsencesScrapper } from '../../application/scrappers/partialAbsences.scrapper';

interface GetStudentProfileRequest {
  cookie: string;
}

@Injectable()
export class GetStudentPartialAbsences {
  constructor(
    private api: ApiService,
    private partialAbsencesScrapper: PartialAbsencesScrapper,
  ) {}

  async execute({ cookie }: GetStudentProfileRequest) {
    const { data, success } = await this.api.get({
      route: 'partialAbsences',
      headers: { cookie },
    });

    if (!success) {
      throw new InvalidCookie();
    }

    return this.partialAbsencesScrapper.scrap(data);
  }
}
