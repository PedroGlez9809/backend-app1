import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { LoginPayload, RegisterPayload } from './auth.types';

type AuthUser = {
  id: number;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  private users: AuthUser[] = [
    {
      id: 1,
      name: 'Test User',
      email: 'test@test.com',
      password: '1234',
    },
  ];

  register(data: RegisterPayload) {
    const name = data.name?.trim();
    const email = data.email?.trim().toLowerCase();
    const password = data.password;
    console.log('Registering user:', { name, email });

    if (!name || !email || !password) {
      throw new BadRequestException('name, email y password son requeridos');
    }

    const emailExists = this.users.some((user) => user.email === email);
    if (emailExists) {
      throw new ConflictException('El email ya está registrado');
    }

    const newUser: AuthUser = {
      id: this.users.length + 1,
      name,
      email,
      password,
    };

    this.users.push(newUser);

    return {
      success: true,
      message: 'Cuenta creada correctamente',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  }

  login(data: LoginPayload) {
    const email = data.email?.trim().toLowerCase();
    const { password } = data;

    const user = this.users.find((item) => item.email === email);

    if (user && user.password === password) {
      return {
        success: true,
        token: 'fake-jwt-token',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }

    return {
      success: false,
      message: 'Credenciales incorrectas',
    };
  }
}
