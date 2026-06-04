"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { HealthResponse, HelloResponse } from "@codeebe/shared";

export function ApiStatus() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [hello, setHello] = useState<HelloResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.getHealth(), api.getHello()])
      .then(([healthRes, helloRes]) => {
        setHealth(healthRes);
        setHello(helloRes);
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return (
      <p className="text-sm text-red-600">
        API unreachable — start the backend with{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">
          pnpm dev:api
        </code>
        . ({error})
      </p>
    );
  }

  if (!health || !hello) {
    return <p className="text-sm text-zinc-500">Connecting to API…</p>;
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
      <p className="font-medium text-zinc-900 dark:text-zinc-100">
        API connected
      </p>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">
        Health: {health.status} · {health.service}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400">{hello.message}</p>
    </div>
  );
}
