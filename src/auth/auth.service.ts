import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(data: any) {
    const { email, password } = data;

    // login falso (solo prueba)
    if (email === 'test@test.com' && password === '1234') {
      return {
        success: true,
        token: 'fake-jwt-token',
        user: {
          id: 1,
          email,
        },
      };
    }

    return {
      success: false,
      message: 'Credenciales incorrectas',
    };
  }
}
