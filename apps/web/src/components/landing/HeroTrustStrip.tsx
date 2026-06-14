import { MaterialIcon } from "@/components/home/MaterialIcon";
import { heroTrustBadges } from "@/data/landing";

export function HeroTrustStrip() {
  return (
    <div
      className="landing-trust-strip mt-3.5 overflow-hidden rounded-lg border sm:mt-4"
      aria-label="Trust and deliverables"
    >
      <ul className="grid grid-cols-2 sm:grid-cols-4">
        {heroTrustBadges.map((badge, index) => (
          <li
            key={badge.label}
            className={[
              "flex flex-col items-center gap-2 border-[var(--landing-border)] px-3 py-4 text-center sm:px-4 sm:py-5",
              index % 2 === 0 ? "border-r" : "",
              index < 2 ? "border-b sm:border-b-0" : "",
              index < heroTrustBadges.length - 1 ? "sm:border-r" : "sm:border-r-0",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="flex h-8 w-8 items-center justify-center">
              <MaterialIcon name={badge.icon} className="!text-[22px] text-[#ff6b00] sm:!text-[24px]" />
            </span>
            <span className="text-[11px] font-medium leading-snug text-[var(--landing-on-surface)] sm:text-xs">
              {badge.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
