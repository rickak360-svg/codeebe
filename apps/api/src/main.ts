import './env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.WEB_ORIGIN,
      process.env.ADMIN_ORIGIN,
    ].filter(Boolean) as string[],
    credentials: true,
  });

  const port = process.env.API_PORT ?? process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}`);
  if (!process.env.DATABASE_URL) {
    console.warn(
      'DATABASE_URL is not set — leads API requires Postgres. Run `pnpm db:up` and `pnpm db:migrate` from the repo root.',
    );
  }
  if (process.env.REDIS_ENABLED === 'false') {
    console.log(
      'Redis/BullMQ disabled (REDIS_ENABLED=false). Leads API is available; jobs demo is off.',
    );
  } else {
    console.log(
      'BullMQ enabled — start Redis with `pnpm redis:up` or set REDIS_ENABLED=false for leads-only.',
    );
  }
}
bootstrap();
