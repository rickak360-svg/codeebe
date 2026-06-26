import "./env.js";
import { Worker } from "bullmq";
import {
  getRedisConnection,
  JOBS,
  QUEUES,
  type ExampleJobPayload,
} from "@codeebe/queue";
import { processExampleJob } from "./processors/example.processor.js";

const connection = getRedisConnection();

const worker = new Worker<ExampleJobPayload>(
  QUEUES.DEFAULT,
  async (job) => {
    switch (job.name) {
      case JOBS.EXAMPLE:
        return processExampleJob(job);
      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  },
  { connection },
);

worker.on("completed", (job) => {
  console.log(`[worker] job ${job.id} (${job.name}) completed`);
});

worker.on("failed", (job, err) => {
  console.error(
    `[worker] job ${job?.id ?? "?"} (${job?.name ?? "?"}) failed:`,
    err.message,
  );
});

worker.on("ready", () => {
  console.log(`[worker] listening on queue "${QUEUES.DEFAULT}"`);
});

async function shutdown(signal: string) {
  console.log(`[worker] ${signal} received, closing…`);
  await worker.close();
  process.exit(0);
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
