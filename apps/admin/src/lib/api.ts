import { createApiClient } from "@codeebe/shared";

const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export const api = createApiClient(baseUrl);
