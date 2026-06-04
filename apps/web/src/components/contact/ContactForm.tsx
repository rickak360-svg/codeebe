"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);

    try {
      await api.createLead({
        fullName: String(fd.get("fullName")),
        email: String(fd.get("email")),
        phone: String(fd.get("phone")),
        companyName: String(fd.get("companyName") || "") || undefined,
        projectType: "Custom Software",
        description: String(fd.get("message")),
        features: [],
        timeline: "Flexible: 6+ weeks",
        source: "contact",
      });
      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <p className="rounded-xl border border-green-800/50 bg-green-950/50 px-4 py-3 text-sm text-green-300">
        Thank you — we received your message and will get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-lg border border-red-900/50 bg-red-950/50 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      <div>
        <label className="text-sm font-medium text-zinc-300" htmlFor="fullName">
          Name *
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
          Company
        </label>
        <input
          id="companyName"
          name="companyName"
          className="input-field mt-1"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-zinc-300" htmlFor="message">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="input-field mt-1"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
