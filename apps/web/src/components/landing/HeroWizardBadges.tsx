import { MaterialIcon } from "@/components/home/MaterialIcon";
import { heroTrustBadges } from "@/data/landing";

export function HeroWizardBadges() {
  return (
    <ul
      className="mt-3 flex flex-nowrap items-center justify-center gap-1 overflow-x-auto sm:gap-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Deliverables included in your brief"
    >
      {heroTrustBadges.map((badge) => (
        <li key={badge.label} className="shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--landing-border)] bg-[var(--landing-card-bg)] py-1 pl-1 pr-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff6b00]/12">
              <MaterialIcon name={badge.icon} className="!text-[13px] text-[#ff6b00]" />
            </span>
            <span className="whitespace-nowrap text-[10px] font-medium text-[var(--landing-on-surface)] sm:text-[11px]">
              {badge.label}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
