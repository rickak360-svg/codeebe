import { MaterialIcon } from "@/components/home/MaterialIcon";
import { siteConfig } from "@/config/site";
import { heroTrustBadges } from "@/data/landing";

export function HeroTrustStrip() {
  return (
    <div
      className="landing-trust-strip mt-3.5 rounded-lg border px-3.5 py-3 sm:mt-4"
      aria-label="Trust and deliverables"
    >
      <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-0.5">
        <span className="landing-muted inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] sm:text-xs">
          <MaterialIcon name="shield" className="!text-[15px] text-[#ff6b00]" />
          Trusted outputs
        </span>
        <span
          className="hidden h-3.5 w-px bg-[var(--landing-border)] sm:inline"
          aria-hidden
        />
        <span className="landing-muted text-[11px] sm:text-xs">
          Typical MVP {siteConfig.heroBuilderEstimate}
        </span>
      </div>

      <ul className="flex flex-nowrap items-center gap-1 overflow-x-auto sm:gap-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {heroTrustBadges.map((badge) => (
          <li key={badge.label} className="shrink-0">
            <span className="landing-trust-badge inline-flex items-center gap-1.5 rounded-md border py-1 pl-1 pr-2 sm:gap-2 sm:py-1.5 sm:pl-1.5 sm:pr-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#ff6b00]/12 sm:h-6 sm:w-6">
                <MaterialIcon
                  name={badge.icon}
                  className="!text-[14px] text-[#ff6b00] sm:!text-[15px]"
                />
              </span>
              <span className="whitespace-nowrap text-[11px] font-medium leading-none sm:text-xs">
                {badge.label}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
