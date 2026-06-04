import type { Job } from "bullmq";
import type { ExampleJobPayload, ExampleJobResult } from "@codeebe/queue";

export async function processExampleJob(
  job: Job<ExampleJobPayload>,
): Promise<ExampleJobResult> {
  const { message, requestedAt } = job.data;

  console.log(
    `[worker] example job ${job.id} — message="${message}" enqueued at ${requestedAt}`,
  );

  return {
    processed: true,
    message,
    finishedAt: new Date().toISOString(),
  };
}
