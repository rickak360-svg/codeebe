export const QUEUES = {
  DEFAULT: "codeebe-default",
} as const;

export const JOBS = {
  EXAMPLE: "example",
} as const;

export type QueueName = (typeof QUEUES)[keyof typeof QUEUES];
export type JobName = (typeof JOBS)[keyof typeof JOBS];
