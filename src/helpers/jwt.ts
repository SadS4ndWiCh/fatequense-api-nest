import jwtConfig from '@config/jwt.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  sign as jwtSign,
  verify as jwtVerify,
  decode as jwtDecode,
  SignOptions,
  VerifyOptions,
  JwtPayload,
} from 'jsonwebtoken';

type JwtOptions = {
  issuer: string;
  subject: string;
  audience: string;
};

@Injectable()
export class JWT {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwt: ConfigType<typeof jwtConfig>,
  ) {}

  sign(payload: string | object | Buffer, options?: JwtOptions) {
    const signOptions: SignOptions = {
      // issuer: options?.issuer,
      // subject: options?.subject,
      // audience: options?.audience,
      expiresIn: this.jwt.expiresIn,
      algorithm: 'RS256',
    };

    return jwtSign(payload, this.jwt.secretKey, signOptions);
  }

  verify(token: string, options?: JwtOptions) {
    const verifyOptions: VerifyOptions = {
      // issuer: options?.issuer,
      // subject: options?.subject,
      // audience: options?.audience,
      algorithms: ['RS256'],
    };

    try {
      return jwtVerify(token, this.jwt.secretKey, verifyOptions) as JwtPayload;
    } catch {
      return false;
    }
  }

  decode(token: string) {
    return jwtDecode(token, { complete: true });
  }
}
