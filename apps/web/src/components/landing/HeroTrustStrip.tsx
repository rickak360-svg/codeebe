import { MaterialIcon } from "@/components/home/MaterialIcon";
import { heroTrustBadges } from "@/data/landing";

export function HeroTrustStrip() {
  return (
    <div
      className="landing-trust-strip mt-7 overflow-hidden rounded-xl border"
      aria-label="Trust and deliverables"
    >
      <ul className="grid grid-cols-2 sm:grid-cols-4">
        {heroTrustBadges.map((badge, index) => (
          <li
            key={badge.label}
            className={[
              "flex flex-col items-center justify-center gap-2 px-3 py-4 text-center sm:px-4 sm:py-5",
              "border-[var(--landing-border)]",
              index % 2 === 0 ? "max-sm:border-r" : "",
              index < 2 ? "max-sm:border-b" : "",
              index > 0 ? "sm:border-l" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff6b00]/10">
              <MaterialIcon name={badge.icon} className="!text-[20px] text-[#ff6b00]" />
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
