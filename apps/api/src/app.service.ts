import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): { message: string } {
    return { message: 'Hello from Codeebe API!' };
  }

  async getHealth(): Promise<{
    status: string;
    service: string;
    database: 'ok' | 'error';
  }> {
    let database: 'ok' | 'error' = 'ok';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      database = 'error';
    }

    return {
      status: database === 'ok' ? 'ok' : 'degraded',
      service: 'codeebe-api',
      database,
    };
  }
}
