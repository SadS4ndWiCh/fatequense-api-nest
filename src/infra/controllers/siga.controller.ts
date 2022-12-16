import { Controller, Get } from '@nestjs/common';

@Controller()
export class SigaController {
  @Get('/profile')
  async getStudentProfile() {
    return {
      name: 'Caio Vinícius',
    };
  }
}
