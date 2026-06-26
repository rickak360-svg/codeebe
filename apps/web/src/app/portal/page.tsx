"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import type { ClientPortalItem } from "@codeebe/shared";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { MaterialIcon } from "@/components/home/MaterialIcon";

function formatInr(n: number) {
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1).replace(/\.0$/, "")}L`;
  if (n >= 1_000) return `₹${(n / 1_000).toFixed(0)}K`;
  return `₹${n}`;
}

export default function ClientPortalPage() {
  const [email, setEmail] = useState("");
  const [items, setItems] = useState<ClientPortalItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await api.getClientPortal(email.trim());
      setItems(data);
    } catch {
      setError("Could not load your projects. Check the email and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex justify-center">
          <BrandLogo variant="header" />
        </div>

        <h1 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
          Client Portal
        </h1>
        <p className="mb-8 text-center text-sm text-white/50">
          Enter the email you used when submitting your project brief to view your quotations.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          <label htmlFor="email" className="mb-2 block text-sm text-white/60">
            Email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#ff6b00]/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#ff6b00] px-6 py-3 text-sm font-semibold text-[#1a0a00] disabled:opacity-50"
            >
              {loading ? "Loading…" : "View my projects"}
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </form>

        {items && (
          <div className="space-y-4">
            {items.length === 0 ? (
              <p className="text-center text-sm text-white/50">
                No projects found for this email yet.
              </p>
            ) : (
              items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-semibold text-white">{item.projectType}</h2>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs capitalize text-white/70">
                      {item.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-white/45">
                    Submitted {new Date(item.createdAt).toLocaleDateString("en-IN")}
                    {item.minPrice != null && item.maxPrice != null && (
                      <> · {formatInr(item.minPrice)} – {formatInr(item.maxPrice)}</>
                    )}
                  </p>
                  {item.quotationActive && item.quotationToken ? (
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/quotation/${item.quotationToken}`}
                        className="text-sm font-medium text-[#ff6b00] hover:underline"
                      >
                        Open quotation →
                      </Link>
                      <a
                        href={api.quotationPdfUrl(item.quotationToken)}
                        className="text-sm text-white/60 hover:text-white"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download PDF
                      </a>
                    </div>
                  ) : (
                    <p className="text-xs text-white/35">
                      Quotation link expired — submit a new brief for a fresh estimate.
                    </p>
                  )}
                </article>
              ))
            )}
          </div>
        )}

        <p className="mt-10 text-center text-sm text-white/40">
          New project?{" "}
          <Link href="/" className="text-[#ff6b00] hover:underline">
            Start a brief on the homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
