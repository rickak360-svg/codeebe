"use client";

import { MaterialIcon } from "@/components/home/MaterialIcon";
import { expertiseItems } from "@/data/landing";
import { GlassCard } from "./GlassCard";
import { Reveal } from "./Reveal";
import { Stagger, StaggerItem } from "./Stagger";

export function ExpertiseSection() {
  return (
    <section id="expertise" className="landing-section-gap scroll-mt-28">
      <div className="site-container">
        <Reveal className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff6b00]">Capabilities</p>
          <h2 className="landing-title mt-3 font-[family-name:var(--font-family-display)] text-3xl font-bold sm:text-4xl lg:text-5xl">
            Core expertise
          </h2>
          <p className="landing-lead mt-4">
            End-to-end product engineering for teams that need reliability, speed, and clarity.
          </p>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {expertiseItems.map((item) => (
            <StaggerItem key={item.title}>
              <GlassCard className="h-full p-7">
                <MaterialIcon name={item.icon} className="text-4xl text-[#ff6b00]" />
                <h3 className="landing-title mt-5 text-lg font-bold">{item.title}</h3>
                <p className="landing-muted mt-2 text-sm leading-relaxed">{item.description}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
