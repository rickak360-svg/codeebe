"use client";

import { MaterialIcon } from "@/components/home/MaterialIcon";
import { whyCodeebeItems } from "@/data/landing";
import { GlassCard } from "./GlassCard";
import { LandingBackdrop } from "./LandingBackdrop";
import { Reveal } from "./Reveal";
import { Stagger, StaggerItem } from "./Stagger";

export function WhyCodeebeSection() {
  return (
    <section
      id="about"
      className="landing-section-alt relative scroll-mt-32 overflow-hidden border-y landing-section-gap"
    >
      <LandingBackdrop />
      <div className="site-container relative">
        <Reveal className="mb-14 text-center md:mx-auto md:max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff6b00]">Why Codeebe</p>
          <h2 className="landing-title mt-3 font-[family-name:var(--font-family-display)] text-3xl font-bold sm:text-4xl">
            Built for founders who need a real engineering partner
          </h2>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyCodeebeItems.map((item) => (
            <StaggerItem key={item.title}>
              <GlassCard className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#ff6b00]/15">
                  <MaterialIcon name={item.icon} className="text-2xl text-[#ff6b00]" />
                </div>
                <h3 className="landing-title mt-4 font-semibold">{item.title}</h3>
                <p className="landing-muted mt-2 text-sm leading-relaxed">{item.description}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
