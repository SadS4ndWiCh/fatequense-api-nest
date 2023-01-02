import { Injectable } from '@nestjs/common';

import { ApiService } from '@infra/http/siga/api/api.service';
import { FailedToLogin } from './errors/failed-to-login';
import { parseCookies } from '@helpers/parse-cookie';
import { JWT } from '@helpers/jwt';

interface LoginWithSigaRequest {
  username: string;
  password: string;
}

@Injectable()
export class LoginWithSiga {
  constructor(private api: ApiService, private jwt: JWT) {}

  async excute({ username, password }: LoginWithSigaRequest) {
    const { res } = await this.api.post({
      route: 'login',
      data: {
        [this.api.USER_INPUT]: username,
        [this.api.PASS_INPUT]: password,
      },
    });

    if (res.statusCode !== this.api.STATUS_REDIRECT) {
      throw new FailedToLogin();
    }

    const cookies = parseCookies(String(res.headers['set-cookie']));

    return this.jwt.sign({
      cookie: cookies[this.api.COOKIE_FIELD_NAME],
    });
  }
}
