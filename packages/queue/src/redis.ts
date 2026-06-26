import type { ConnectionOptions } from "bullmq";

export function getRedisConnection(): ConnectionOptions {
  const url = process.env.REDIS_URL;
  if (url) {
    const needsTls = url.startsWith("rediss://") || /upstash\.io/i.test(url);
    return {
      url,
      maxRetriesPerRequest: null,
      ...(needsTls ? { tls: {} } : {}),
    };
  }

  return {
    host: process.env.REDIS_HOST ?? "localhost",
    port: Number(process.env.REDIS_PORT ?? 6379),
    password: process.env.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: null,
  };
}
