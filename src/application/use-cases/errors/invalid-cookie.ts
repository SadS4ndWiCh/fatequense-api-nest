import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCookie extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Sessão expirada',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
