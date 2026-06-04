import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return hello message', () => {
      expect(appController.getHello()).toEqual({
        message: 'Hello from Codeebe API!',
      });
    });
  });

  describe('health', () => {
    it('should return health status', async () => {
      await expect(appController.getHealth()).resolves.toEqual({
        status: 'ok',
        service: 'codeebe-api',
        database: 'ok',
      });
    });
  });
});
