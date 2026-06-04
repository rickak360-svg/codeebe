import { createApiClient } from "@codeebe/shared";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const api = createApiClient(baseUrl);
