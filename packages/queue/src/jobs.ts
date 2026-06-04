export type ExampleJobPayload = {
  message: string;
  requestedAt: string;
};

export type ExampleJobResult = {
  processed: boolean;
  message: string;
  finishedAt: string;
};
