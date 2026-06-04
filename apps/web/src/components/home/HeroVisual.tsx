const codeLines = [
  { parts: [{ t: "export", c: "text-[#ff6600]" }, { t: " const ", c: "text-zinc-500" }, { t: "platform", c: "text-sky-300" }, { t: " = {", c: "text-zinc-300" }] },
  { parts: [{ t: "  frontend: ", c: "text-zinc-500" }, { t: '"Next.js"', c: "text-emerald-400" }, { t: ",", c: "text-zinc-300" }] },
  { parts: [{ t: "  backend: ", c: "text-zinc-500" }, { t: '"NestJS"', c: "text-emerald-400" }, { t: ",", c: "text-zinc-300" }] },
  { parts: [{ t: "  deploy: ", c: "text-zinc-500" }, { t: '"AWS"', c: "text-emerald-400" }, { t: ",", c: "text-zinc-300" }] },
  { parts: [{ t: "  status: ", c: "text-zinc-500" }, { t: '"live"', c: "text-[#ff6600]" }] },
  { parts: [{ t: "};", c: "text-zinc-300" }] },
];

const stackBadges = ["React", "Node.js", "PostgreSQL", "Redis"];

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-md lg:max-w-none lg:ml-auto">
      <div className="pointer-events-none absolute -right-6 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#ff6600]/10 blur-3xl" />

      <div className="hero-glass relative rounded-2xl p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-semibold text-white">Production Live</span>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-right">
            <span className="text-lg font-bold leading-none text-white">98</span>
            <span className="ml-1.5 text-[10px] text-zinc-400">Lighthouse</span>
          </div>
        </div>

        <div className="rounded-xl border border-white/5 bg-black/40 p-3">
          <div className="mb-2 flex items-center gap-1.5 border-b border-white/5 pb-2">
            <span className="h-2 w-2 rounded-full bg-red-500/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
            <span className="h-2 w-2 rounded-full bg-green-500/80" />
            <span className="ml-1 font-mono text-[10px] text-zinc-500">platform.config.ts</span>
          </div>
          <pre className="overflow-x-auto font-mono text-[10px] leading-relaxed sm:text-[11px]">
            {codeLines.map((line, i) => (
              <div key={i}>
                {line.parts.map((p, j) => (
                  <span key={j} className={p.c}>
                    {p.t}
                  </span>
                ))}
              </div>
            ))}
          </pre>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              Instant estimate
            </p>
            <p className="mt-1 text-sm font-bold text-[#ff6600]">₹2.5L – ₹8L</p>
            <p className="text-[10px] text-zinc-500">SaaS MVP range</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              Build pipeline
            </p>
            <div className="mt-1.5 space-y-1">
              {["Design", "Develop", "Deploy"].map((step, i) => (
                <div key={step} className="flex items-center gap-1.5">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff6600]/20 text-[8px] font-bold text-[#ff6600]">
                    {i + 1}
                  </span>
                  <span className="text-[11px] text-zinc-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {stackBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-300"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
