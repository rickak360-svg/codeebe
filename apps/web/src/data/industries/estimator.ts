/**
 * Generic, industry-agnostic cost estimator engine.
 *
 * Every industry landing page supplies its own `EstimatorConfig` (questions,
 * per-option costs, baseline). This one pure engine turns a set of selections
 * into a full estimate — cost band, timeline, complexity, team size, package,
 * hosting, maintenance and AI upgrade suggestions. All amounts in INR.
 */

export type EstOption = {
  id: string;
  label: string;
  desc?: string;
  icon: string;
  /** one-time build-cost contribution in INR */
  cost: number;
  /** timeline steps only: multiplier applied to the running subtotal */
  multiplier?: number;
  /** when true and this option is NOT selected, `tip` is offered as an upgrade */
  suggest?: boolean;
  tip?: string;
};

export type EstStepKind = "scale" | "feature" | "timeline";

export type EstStep = {
  id: string;
  kind: EstStepKind;
  eyebrow: string;
  title: string;
  subtitle: string;
  type: "single" | "multi";
  /** minimum selections for a step to count as answered (0 = optional) */
  min?: number;
  options: EstOption[];
};

export type EstimatorConfig = {
  /** industry name used in the emailed lead summary */
  industryLabel: string;
  /** always-included design system + core scaffold */
  platformBaseline: number;
  steps: EstStep[];
  budgetOptions: string[];
};

export type EstimatorSelections = Record<string, string[]>;

export type EstimateResult = {
  low: number;
  high: number;
  point: number;
  timelineWeeks: [number, number];
  complexity: number;
  featureCount: number;
  teamSize: number;
  recommendedPackage: "Starter" | "Professional" | "Enterprise";
  hosting: string;
  monthlyMaintenance: number;
  upgradeSuggestions: string[];
};

export function totalFeatureCount(config: EstimatorConfig): number {
  return config.steps.filter((s) => s.kind === "feature").reduce((n, s) => n + s.options.length, 0);
}

export function calculateEstimate(config: EstimatorConfig, selections: EstimatorSelections): EstimateResult {
  let base = 0;
  let featuresTotal = 0;
  let multiplier = 1;
  let featureCount = 0;
  const selectedIds = new Set<string>();

  for (const step of config.steps) {
    const chosen = selections[step.id] ?? [];
    for (const id of chosen) {
      const opt = step.options.find((o) => o.id === id);
      if (!opt) continue;
      selectedIds.add(id);
      if (step.kind === "scale") base += opt.cost;
      else if (step.kind === "timeline") multiplier = opt.multiplier ?? 1;
      else {
        featuresTotal += opt.cost;
        featureCount += 1;
      }
    }
  }

  const subtotal = (config.platformBaseline + base + featuresTotal) * multiplier;
  const point = Math.round(subtotal / 1000) * 1000;
  const low = Math.round((point * 0.9) / 1000) * 1000;
  const high = Math.round((point * 1.18) / 1000) * 1000;

  const totalFeatures = totalFeatureCount(config);
  const complexity = Math.min(
    100,
    Math.round(28 + (featureCount / Math.max(1, totalFeatures)) * 62 + (multiplier - 1) * 40),
  );

  const baseWeeks = 6 + Math.round((complexity / 100) * 18);
  const rushFactor = multiplier >= 1.2 ? 0.7 : multiplier >= 1.08 ? 0.85 : 1;
  const lowWeeks = Math.max(4, Math.round(baseWeeks * rushFactor));
  const highWeeks = Math.round(lowWeeks * 1.35);

  const teamSize = Math.min(9, 3 + Math.round((complexity / 100) * 5) + (multiplier >= 1.2 ? 1 : 0));

  const recommendedPackage: EstimateResult["recommendedPackage"] =
    point < 300000 ? "Starter" : point < 700000 ? "Professional" : "Enterprise";

  const hosting =
    complexity < 45
      ? "Managed Cloud (2 vCPU · 4GB) — ~₹2,500/mo"
      : complexity < 75
        ? "Auto-scaling Cloud (4 vCPU · 8GB) — ~₹6,500/mo"
        : "Enterprise Cluster + CDN + DB replica — ~₹18,000/mo";

  const monthlyMaintenance = Math.round((point * 0.02) / 500) * 500;

  const upgradeSuggestions: string[] = [];
  for (const step of config.steps) {
    if (step.kind !== "feature") continue;
    for (const opt of step.options) {
      if (opt.suggest && opt.tip && !selectedIds.has(opt.id)) upgradeSuggestions.push(opt.tip);
    }
  }
  if (upgradeSuggestions.length === 0)
    upgradeSuggestions.push("You've selected a comprehensive stack — you're launch-ready.");

  return {
    low,
    high,
    point,
    timelineWeeks: [lowWeeks, highWeeks],
    complexity,
    featureCount,
    teamSize,
    recommendedPackage,
    hosting,
    monthlyMaintenance,
    upgradeSuggestions: upgradeSuggestions.slice(0, 3),
  };
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatINRCompact(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}
