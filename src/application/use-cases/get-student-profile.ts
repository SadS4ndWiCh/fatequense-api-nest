import { Injectable } from '@nestjs/common';

import { JWT } from '@helpers/jwt';

import { ApiService } from '@infra/http/siga/api/api.service';
import { InvalidCookie } from './errors/invalid-cookie';
import { ProfileScrapper } from '@application/scrappers/profile.scrapper';

interface GetStudentProfileRequest {
  cookie: string;
}

@Injectable()
export class GetStudentProfile {
  constructor(
    private api: ApiService,
    private profileScrapper: ProfileScrapper,
  ) {}

  async execute({ cookie }: GetStudentProfileRequest) {
    const { data, success } = await this.api.get({
      route: 'home',
      headers: {
        cookie,
      },
    });

    if (!success) {
      throw new InvalidCookie();
    }

    return this.profileScrapper.scrap(data);
  }
}
