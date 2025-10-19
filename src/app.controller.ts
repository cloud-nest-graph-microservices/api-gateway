import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor() {}

  // app.controller.ts or any route handler
   @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtectedData() {
    return { message: 'You are authenticated!' };
  }
}
