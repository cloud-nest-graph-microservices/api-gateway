import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // app.controller.ts or any route handler
   @UseGuards(JwtAuthGuard)
  //@Roles('user')
  @Get('protected')
  getProtectedData() {
    return { message: 'You are authenticated!' };
  }
}
