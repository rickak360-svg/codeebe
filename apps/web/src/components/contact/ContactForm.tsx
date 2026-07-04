"use client";

import { useState } from "react";
import { api } from "@/lib/api";

const SERVICES_MARQUEE = [
  "Web App", "Mobile App", "UI/UX Design", "SaaS", "AI / ML",
  "Full-Stack", "E-Commerce", "Cloud", "Automation", "Dashboard",
  "API Development", "DevOps", "WordPress", "Marketplace",
];

const INPUT_CLASS =
  "w-full rounded-xl border border-white/[0.1] bg-[#1a1a1a] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/30 transition-all duration-200 focus:border-[#ff6b00]/60 focus:bg-[#1a1a1a] focus:shadow-[0_0_0_3px_rgba(255,107,0,0.1)] focus:outline-none";

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
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/30">
          <span className="material-symbols-outlined !text-[32px] text-green-400">check_circle</span>
        </div>
        <h3 className="text-xl font-semibold text-white">Message sent!</h3>
        <p className="max-w-sm text-sm text-white/50">
          Thank you — we received your message and will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3">
          <span className="material-symbols-outlined !text-[18px] text-red-400">error</span>
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Services marquee */}
      <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0d0d0d] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0d0d0d] to-transparent" />
        <div className="flex animate-marquee whitespace-nowrap">
          {[...SERVICES_MARQUEE, ...SERVICES_MARQUEE].map((service, i) => (
            <span
              key={`${service}-${i}`}
              className="mx-3 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white/25"
            >
              <span className="h-1 w-1 rounded-full bg-[#ff6b00]/40" />
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Name + Email row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-[13px] font-medium text-white/60" htmlFor="fullName">
            Name <span className="text-[#ff6b00]">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
              <span className="material-symbols-outlined !text-[18px] text-white/30">person</span>
            </span>
            <input
              id="fullName"
              name="fullName"
              required
              placeholder="Enter your name"
              className={INPUT_CLASS}
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-[13px] font-medium text-white/60" htmlFor="email">
            Email <span className="text-[#ff6b00]">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
              <span className="material-symbols-outlined !text-[18px] text-white/30">mail</span>
            </span>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className={INPUT_CLASS}
            />
          </div>
        </div>
      </div>

      {/* Phone + Company row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-[13px] font-medium text-white/60" htmlFor="phone">
            Phone <span className="text-[#ff6b00]">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
              <span className="material-symbols-outlined !text-[18px] text-white/30">call</span>
            </span>
            <input
              id="phone"
              name="phone"
              required
              placeholder="Enter your phone number"
              className={INPUT_CLASS}
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-[13px] font-medium text-white/60" htmlFor="companyName">
            Company
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
              <span className="material-symbols-outlined !text-[18px] text-white/30">apartment</span>
            </span>
            <input
              id="companyName"
              name="companyName"
              placeholder="Enter your company name"
              className={INPUT_CLASS}
            />
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="mb-2 block text-[13px] font-medium text-white/60" htmlFor="message">
          Message <span className="text-[#ff6b00]">*</span>
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-4">
            <span className="material-symbols-outlined !text-[18px] text-white/30">edit_note</span>
          </span>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project requirements..."
            className="w-full rounded-xl border border-white/[0.1] bg-[#1a1a1a] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/30 transition-all duration-200 focus:border-[#ff6b00]/60 focus:bg-[#1a1a1a] focus:shadow-[0_0_0_3px_rgba(255,107,0,0.1)] focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#ff8533] px-6 py-4 text-sm font-bold text-white shadow-[0_8px_28px_-8px_rgba(255,107,0,0.5)] transition-all duration-300 hover:shadow-[0_12px_36px_-8px_rgba(255,107,0,0.65)] hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
        <span className="relative flex items-center justify-center gap-2">
          <span className="material-symbols-outlined !text-[18px]">{loading ? "hourglass_top" : "send"}</span>
          {loading ? "Sending..." : "Send Message"}
        </span>
      </button>
    </form>
  );
}
