import type { IndustryTheme } from "@/components/industry/theme";
import type { EstimatorConfig } from "./estimator";

export type TintKey = "primary" | "secondary" | "success";

export type DashboardKpi = { label: string; value: string; icon: string; tint?: TintKey };
export type DashboardRow = { name: string; pct: number };
export type FloatCard = { icon: string; label: string; value: string; tint?: TintKey };

export type IndustryConfig = {
  slug: string;
  navLabel: string;
  navIcon: string;
  theme: IndustryTheme;
  meta: { title: string; description: string };

  hero: {
    badge: string;
    badgeIcon: string;
    titleLead: string;
    titleHighlight: string;
    titleTrail?: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trustPills: { icon: string; label: string }[];
  };

  dashboard: {
    title: string;
    titleIcon: string;
    kpis: DashboardKpi[];
    chartTitle: string;
    chartCaption: string;
    bars: number[];
    listTitle: string;
    listRows: DashboardRow[];
    floatA: FloatCard;
    floatB: FloatCard;
  };

  /** logos / partners marquee labels */
  trustedBy: string[];

  problems: { pain: string; painIcon: string; fix: string; fixIcon: string }[];

  features: { title: string; desc: string; icon: string; span?: 1 | 2; highlight?: boolean }[];

  showcase: {
    heading: string;
    subtitle: string;
    liveUrl?: string;
    liveDomain?: string;
    liveTitle?: string;
    liveDesc?: string;
    liveLocation?: string;
  };

  estimator: EstimatorConfig;

  packages: {
    name: string;
    price: string;
    period: string;
    tagline: string;
    features: string[];
    popular?: boolean;
    cta: string;
  }[];

  stats: { value: string; label: string; icon: string }[];

  testimonials: { quote: string; name: string; role: string; metric: string; metricLabel: string }[];

  faqs: { q: string; a: string }[];

  contact: {
    heading: string;
    subtitle: string;
    businessTypes: string[];
    perks: { icon: string; title: string; desc: string }[];
  };

  /** optional override of the 8-step delivery process */
  process?: { title: string; desc: string; icon: string }[];

  subNav: { label: string; href: string }[];
};

export const DEFAULT_PROCESS = [
  { title: "Consultation", desc: "We understand your business, goals & audience.", icon: "forum" },
  { title: "Requirements", desc: "Detailed scope, features & success metrics.", icon: "fact_check" },
  { title: "UI/UX Design", desc: "Premium, on-brand interface prototypes.", icon: "design_services" },
  { title: "Development", desc: "Agile sprints with weekly demos.", icon: "code" },
  { title: "Testing", desc: "QA, security & load testing.", icon: "bug_report" },
  { title: "Deployment", desc: "Zero-downtime launch to production.", icon: "rocket_launch" },
  { title: "Training", desc: "Hands-on onboarding for your team.", icon: "school" },
  { title: "Support", desc: "Ongoing maintenance & upgrades.", icon: "support_agent" },
];
