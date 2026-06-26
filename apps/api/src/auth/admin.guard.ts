import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization header.');
    }
    const token = header.slice('Bearer '.length).trim();
    try {
      const payload = this.jwt.verify<{ role?: string }>(token);
      if (payload.role !== 'admin') {
        throw new UnauthorizedException('Insufficient privileges.');
      }
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired session.');
    }
  }
}
