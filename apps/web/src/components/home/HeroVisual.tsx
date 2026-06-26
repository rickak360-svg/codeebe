const stackBadges = ["React", "Node.js", "PostgreSQL", "Redis"];

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-none lg:max-w-none lg:ml-auto">
      <div className="pointer-events-none absolute -right-8 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#ff6600]/16 blur-3xl sm:-right-6 sm:h-40 sm:w-40 sm:bg-[#ff6600]/10" />
      <div className="pointer-events-none absolute -left-6 bottom-4 h-28 w-28 rounded-full bg-[#ffb693]/10 blur-2xl sm:hidden" />

      <div className="hero-glass relative rounded-[1.25rem] p-4 shadow-[0_20px_50px_-20px_rgba(255,107,0,0.35)] sm:rounded-2xl sm:p-5 sm:shadow-none">
        {/* Status row */}
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

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2.5">
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

        {/* Tech badges */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
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
