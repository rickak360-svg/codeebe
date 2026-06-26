import { MaterialIcon } from "@/components/home/MaterialIcon";
import { heroTrustBadges } from "@/data/landing";

export function HeroTrustStrip() {
  return (
    <div
      className="landing-trust-strip -mx-1 mt-4 overflow-hidden rounded-xl border sm:mx-0 sm:mt-4 sm:rounded-lg"
      aria-label="Trust and deliverables"
    >
      {/* Mobile: horizontal snap scroll — wild but scannable */}
      <ul className="flex snap-x snap-mandatory gap-0 overflow-x-auto [scrollbar-width:none] sm:grid sm:grid-cols-4 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
        {heroTrustBadges.map((badge, index) => (
          <li
            key={badge.label}
            className={[
              "flex min-w-[42%] shrink-0 snap-start flex-col items-center gap-2 px-3 py-3.5 text-center sm:min-w-0 sm:shrink sm:px-4 sm:py-5",
              "border-[var(--landing-border)]",
              index < heroTrustBadges.length - 1 ? "border-r sm:border-r" : "",
              "max-sm:border-b-0",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff6b00]/10 sm:h-8 sm:w-8 sm:rounded-none sm:bg-transparent">
              <MaterialIcon name={badge.icon} className="!text-[20px] text-[#ff6b00] sm:!text-[24px]" />
            </span>
            <span className="text-[10px] font-semibold leading-snug text-[var(--landing-on-surface)] sm:text-xs sm:font-medium">
              {badge.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
