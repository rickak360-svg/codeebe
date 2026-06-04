import { useEffect, useState } from "react";
import { api } from "../lib/api";

function parseApiError(message: string): string {
  if (message.includes("Failed to fetch") || message.includes("NetworkError")) {
    return "Cannot reach the API. Run pnpm dev:api on port 3001 and check VITE_API_URL in apps/admin/.env.";
  }
  try {
    const json = JSON.parse(message) as { message?: string; statusCode?: number };
    if (json.message?.includes("Cannot GET")) {
      return "Wrong API URL — use http://localhost:3001 (NestJS), not the Next.js app on :3000.";
    }
    if (json.statusCode === 404) {
      return "API route not found. Restart the API after pulling latest code.";
    }
    return json.message ?? message;
  } catch {
    return message;
  }
}

export function ApiBanner() {
  const [issue, setIssue] = useState<string | null>(null);

  useEffect(() => {
    api
      .getHealth()
      .then((h) => {
        if (h.database === "error") {
          setIssue(
            "API is up but Postgres is down. Run pnpm db:up and pnpm db:migrate from the repo root.",
          );
        } else {
          setIssue(null);
        }
      })
      .catch((err: Error) => setIssue(parseApiError(err.message)));
  }, []);

  if (!issue) return null;

  return (
    <div className="api-banner" role="alert">
      {issue}
    </div>
  );
}
