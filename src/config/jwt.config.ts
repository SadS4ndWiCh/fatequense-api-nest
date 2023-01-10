import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  publicKey: process.env.JWT_PUBLIC_KEY as string,
  secretKey: process.env.JWT_SECRET_KEY as string,
  expiresIn: process.env.JWT_EXPIRES_IN as string,
}));
