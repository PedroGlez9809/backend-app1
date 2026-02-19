import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginPayload, RegisterPayload } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginPayload) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterPayload) {
    return this.authService.register(body);
  }
}
