import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly adminPassword?: string;

  constructor(private readonly jwt: JwtService) {
    this.adminPassword = process.env.ADMIN_PASSWORD;
    if (!this.adminPassword) {
      this.logger.warn(
        'ADMIN_PASSWORD is not set — admin login is disabled until you set it in apps/api/.env',
      );
    }
  }

  login(password: string): { token: string } {
    if (!this.adminPassword) {
      throw new UnauthorizedException('Admin login is not configured.');
    }
    if (password !== this.adminPassword) {
      throw new UnauthorizedException('Invalid password.');
    }
    const token = this.jwt.sign({ role: 'admin' });
    return { token };
  }
}
