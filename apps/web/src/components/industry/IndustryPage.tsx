"use client";

import type { IndustryConfig } from "@/data/industries/types";
import { IndustryThemeProvider } from "./theme";
import { IndustryHero } from "./Hero";
import { TrustedBy, Problems, Features, Process, Stats, Testimonials, Faq } from "./Sections";
import { Showcase } from "./Showcase";
import { Estimator } from "./Estimator";
import { Packages, Contact, CtaBand } from "./PackagesContact";

export function IndustryPage({ config }: { config: IndustryConfig }) {
  return (
    <IndustryThemeProvider theme={config.theme}>
      <main className="relative overflow-x-clip" style={{ background: config.theme.bg, color: config.theme.text }}>
        <IndustryHero config={config} />
        <TrustedBy config={config} />
        <Problems config={config} />
        <Features config={config} />
        <Showcase config={config} />
        <Estimator config={config} />
        <Packages config={config} />
        <Process config={config} />
        <Stats config={config} />
        <Testimonials config={config} />
        <Faq config={config} />
        <Contact config={config} />
        <CtaBand config={config} />
      </main>
    </IndustryThemeProvider>
  );
}
