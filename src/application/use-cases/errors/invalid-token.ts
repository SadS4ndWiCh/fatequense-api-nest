import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidToken extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Token inválido',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
