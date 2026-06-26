import { createApiClient } from "@codeebe/shared";
import { clearToken, getToken } from "./auth";

const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export const api = createApiClient(baseUrl, {
  getToken,
  onUnauthorized: () => {
    clearToken();
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  },
});
