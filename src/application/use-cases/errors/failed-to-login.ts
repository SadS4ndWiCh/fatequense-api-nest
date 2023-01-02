import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedToLogin extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Usuário ou senha inválido',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
