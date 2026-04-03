import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { LoginPayload, RegisterPayload } from './auth.types';

type AuthUser = {
  id: number;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: { username: string; password: string }) {
    // aquí iría la validación real de usuario con tu DB o .NET engine
    const payload = { username: user.username, sub: 1 }; 
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
