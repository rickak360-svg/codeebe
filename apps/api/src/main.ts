import './env';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3008',
    'http://localhost:5173',
    process.env.WEB_ORIGIN,
    process.env.ADMIN_ORIGIN,
  ].filter(Boolean) as string[];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // Allow any Vercel preview deployment for this project
      if (/^https:\/\/codeebe-.*\.vercel\.app$/.test(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
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
