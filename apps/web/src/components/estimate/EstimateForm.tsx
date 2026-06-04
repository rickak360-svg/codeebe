"use client";

import { useState } from "react";
import type { CreateLeadResponse } from "@codeebe/shared";
import { api } from "@/lib/api";
import { siteConfig } from "@/config/site";
import { Button, ButtonLink } from "@/components/ui/Button";
import {
  budgetRanges,
  featureOptions,
  projectTypes,
  timelineOptions,
} from "@/data/pricing";

function formatInr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function EstimateForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateLeadResponse | null>(null);
  const [features, setFeatures] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);

    try {
      const response = await api.createLead({
        fullName: String(fd.get("fullName")),
        email: String(fd.get("email")),
        phone: String(fd.get("phone")),
        companyName: String(fd.get("companyName") || "") || undefined,
        projectType: String(fd.get("projectType")),
        description: String(fd.get("description")),
        features,
        timeline: String(fd.get("timeline")),
        budgetRange: String(fd.get("budgetRange") || "") || undefined,
        source: "estimate",
      });
      setResult(response);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setLoading(false);
    }
  }

  

  function toggleFeature(feature: string) {
    setFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature],
    );
  }

  if (result) {
    const { estimate } = result;
    return (
      <div className="card-surface p-6 sm:p-8">
        <p className="text-sm font-medium text-[#ff6600]">Your basic estimate</p>
        <h2 className="mt-2 text-3xl font-bold text-white">
          {formatInr(estimate.minPrice)} – {formatInr(estimate.maxPrice)}
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Basic estimate only — final cost depends on detailed scope.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p className="text-xs font-medium uppercase text-zinc-500">Timeline</p>
            <p className="mt-1 font-medium text-white">{estimate.timelineLabel}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p className="text-xs font-medium uppercase text-zinc-500">Suggested package</p>
            <p className="mt-1 font-medium text-white">{estimate.suggestedPackage}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-white">Feature summary</p>
          <p className="mt-1 text-sm text-zinc-400">{estimate.summary}</p>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-white">Codeebe provides</p>
          <ul className="mt-2 space-y-1 text-sm text-zinc-400">
            {estimate.codeebeProvides.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[#ff6600]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400">
          {estimate.marketComparisonNote}
        </p>

        {estimate.notes.length > 0 && (
          <ul className="mt-4 space-y-1 text-xs text-zinc-500">
            {estimate.notes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={siteConfig.calendlyUrl} external>
            Book discovery call on Calendly
          </ButtonLink>
          <Button
            variant="outline"
            onClick={() => {
              setResult(null);
              setFeatures([]);
            }}
          >
            Submit another requirement
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <p className="rounded-lg border border-red-900/50 bg-red-950/50 px-4 py-3 text-sm text-red-300">
          {error}. Make sure the API is running (<code>pnpm dev:api</code>).
        </p>
      )}

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="sr-only">Contact</legend>
        <div>
          <label className="text-sm font-medium text-zinc-300" htmlFor="fullName">
            Full name *
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            className="input-field mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-300" htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input-field mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-300" htmlFor="phone">
            Phone *
          </label>
          <input
            id="phone"
            name="phone"
            required
            className="input-field mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-300" htmlFor="companyName">
            Company / business name
          </label>
          <input
            id="companyName"
            name="companyName"
            className="input-field mt-1"
          />
        </div>
      </fieldset>

      <div>
        <label className="text-sm font-medium text-zinc-300" htmlFor="projectType">
          Project type *
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          className="input-field mt-1"
          defaultValue="Business Website"
        >
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-300" htmlFor="description">
          Short project description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          className="input-field mt-1"
          placeholder="What are you building? Who are the users?"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-300">Required features</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {featureOptions.map((feature) => (
            <label
              key={feature}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-300 hover:border-[#ff6600]/40"
            >
              <input
                type="checkbox"
                checked={features.includes(feature)}
                onChange={() => toggleFeature(feature)}
              />
              {feature}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-zinc-300" htmlFor="timeline">
            Timeline *
          </label>
          <select
            id="timeline"
            name="timeline"
            required
            className="input-field mt-1"
            defaultValue="Standard: 3-5 weeks"
          >
            {timelineOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-300" htmlFor="budgetRange">
            Budget range
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            className="input-field mt-1"
          >
            <option value="">Prefer not to say</option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Calculating…" : "Get instant estimate"}
      </Button>
    </form>
  );
}
