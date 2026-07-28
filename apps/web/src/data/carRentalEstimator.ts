/**
 * Car Rental platform — cost estimator data + pure pricing engine.
 * All amounts in INR. Pricing is deliberately transparent and rule-based so the
 * same logic can run client-side (live preview) and be re-verified server-side.
 */

export type EstimatorOption = {
  id: string;
  label: string;
  desc?: string;
  icon: string;
  /** One-time build cost contribution in INR. */
  cost: number;
  /** Optional multiplier applied to the running subtotal (used by timeline). */
  multiplier?: number;
};

export type EstimatorStep = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  type: "single" | "multi";
  /** minimum selections for a multi step to be considered "answered" (0 = optional) */
  min?: number;
  options: EstimatorOption[];
};

export const estimatorSteps: EstimatorStep[] = [
  {
    id: "fleet",
    eyebrow: "Step 01",
    title: "How large is your fleet?",
    subtitle: "This sets the baseline scale of your platform's infrastructure.",
    type: "single",
    min: 1,
    options: [
      { id: "fleet-s", label: "1 – 10 vehicles", desc: "Boutique / starting out", icon: "directions_car", cost: 120000 },
      { id: "fleet-m", label: "10 – 30 vehicles", desc: "Growing operation", icon: "local_taxi", cost: 180000 },
      { id: "fleet-l", label: "30 – 100 vehicles", desc: "Established fleet", icon: "garage", cost: 260000 },
      { id: "fleet-xl", label: "100+ vehicles", desc: "Enterprise scale", icon: "warehouse", cost: 360000 },
    ],
  },
  {
    id: "business",
    eyebrow: "Step 02",
    title: "What's your business model?",
    subtitle: "Different models need different booking logic and workflows.",
    type: "single",
    min: 1,
    options: [
      { id: "biz-self", label: "Self Drive", icon: "airline_seat_recline_normal", cost: 40000 },
      { id: "biz-lux", label: "Luxury Rental", icon: "diamond", cost: 90000 },
      { id: "biz-bike", label: "Bike Rental", icon: "two_wheeler", cost: 30000 },
      { id: "biz-corp", label: "Corporate Rental", icon: "corporate_fare", cost: 80000 },
      { id: "biz-mixed", label: "Mixed Fleet", icon: "dashboard_customize", cost: 100000 },
    ],
  },
  {
    id: "access",
    eyebrow: "Step 03",
    title: "Access & portals",
    subtitle: "Who logs in, and what can they do?",
    type: "multi",
    options: [
      { id: "customer-login", label: "Customer Login", icon: "person", cost: 35000 },
      { id: "driver-login", label: "Driver Login", icon: "badge", cost: 40000 },
      { id: "partner-portal", label: "Partner Portal", icon: "handshake", cost: 65000 },
      { id: "franchise", label: "Franchise Management", icon: "account_tree", cost: 120000 },
      { id: "role-mgmt", label: "Role Management", icon: "admin_panel_settings", cost: 45000 },
      { id: "multi-branch", label: "Multi-Branch Support", icon: "store", cost: 75000 },
    ],
  },
  {
    id: "fleetops",
    eyebrow: "Step 04",
    title: "Fleet operations",
    subtitle: "Modules that keep your vehicles running profitably.",
    type: "multi",
    options: [
      { id: "fleet-mgmt", label: "Fleet Management", icon: "directions_car", cost: 70000 },
      { id: "maintenance", label: "Maintenance Module", icon: "build", cost: 45000 },
      { id: "driver-alloc", label: "Driver Allocation", icon: "route", cost: 40000 },
      { id: "fuel", label: "Fuel Tracking", icon: "local_gas_station", cost: 30000 },
      { id: "gps", label: "GPS Integration", icon: "gps_fixed", cost: 85000 },
      { id: "inventory", label: "Inventory Management", icon: "inventory_2", cost: 40000 },
    ],
  },
  {
    id: "booking",
    eyebrow: "Step 05",
    title: "Booking & payments",
    subtitle: "How customers reserve, pay, and get billed.",
    type: "multi",
    options: [
      { id: "online-booking", label: "Online Booking Engine", icon: "event_available", cost: 90000 },
      { id: "payment", label: "Payment Gateway", icon: "credit_card", cost: 45000 },
      { id: "gst", label: "GST Billing", icon: "receipt_long", cost: 35000 },
      { id: "invoice", label: "Invoice System", icon: "description", cost: 30000 },
      { id: "wallet", label: "Customer Wallet", icon: "account_balance_wallet", cost: 45000 },
      { id: "coupons", label: "Coupons & Offers", icon: "sell", cost: 25000 },
      { id: "referral", label: "Referral System", icon: "group_add", cost: 35000 },
    ],
  },
  {
    id: "apps",
    eyebrow: "Step 06",
    title: "Mobile apps",
    subtitle: "Native reach for customers and drivers on the move.",
    type: "multi",
    options: [
      { id: "mobile-pwa", label: "Mobile Web App (PWA)", icon: "smartphone", cost: 60000 },
      { id: "android", label: "Android App", icon: "android", cost: 150000 },
      { id: "ios", label: "iOS App", icon: "phone_iphone", cost: 160000 },
    ],
  },
  {
    id: "intelligence",
    eyebrow: "Step 07",
    title: "Intelligence & automation",
    subtitle: "The premium layer that separates you from competitors.",
    type: "multi",
    options: [
      { id: "analytics", label: "Analytics Dashboard", icon: "insights", cost: 60000 },
      { id: "crm", label: "CRM", icon: "contacts", cost: 70000 },
      { id: "ai-chatbot", label: "AI Chatbot", icon: "smart_toy", cost: 90000 },
      { id: "ai-booking", label: "AI Booking Assistant", icon: "auto_awesome", cost: 120000 },
      { id: "ai-reco", label: "AI Recommendations", icon: "recommend", cost: 80000 },
      { id: "email-auto", label: "Email Automation", icon: "forward_to_inbox", cost: 40000 },
      { id: "whatsapp", label: "WhatsApp Integration", icon: "chat", cost: 50000 },
      { id: "multi-lang", label: "Multi-Language", icon: "translate", cost: 45000 },
    ],
  },
  {
    id: "timeline",
    eyebrow: "Step 08",
    title: "How soon do you need to launch?",
    subtitle: "Faster launches need a larger dedicated team.",
    type: "single",
    min: 1,
    options: [
      { id: "tl-flex", label: "Flexible (3 – 5 months)", desc: "Best value", icon: "spa", cost: 0, multiplier: 1.0 },
      { id: "tl-std", label: "Standard (2 – 3 months)", desc: "Balanced", icon: "schedule", cost: 0, multiplier: 1.08 },
      { id: "tl-rush", label: "Rush (4 – 8 weeks)", desc: "Priority team", icon: "bolt", cost: 0, multiplier: 1.2 },
    ],
  },
];

/* ── All feature IDs (excludes single-choice scale/business/timeline) ── */
export const featureStepIds = ["access", "fleetops", "booking", "apps", "intelligence"];

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

function findOption(stepId: string, optionId: string): EstimatorOption | undefined {
  return estimatorSteps.find((s) => s.id === stepId)?.options.find((o) => o.id === optionId);
}

/** Total number of toggle-able features across feature steps. */
export const totalFeatureCount = estimatorSteps
  .filter((s) => featureStepIds.includes(s.id))
  .reduce((n, s) => n + s.options.length, 0);

export function calculateEstimate(selections: EstimatorSelections): EstimateResult {
  let base = 0;
  let featuresTotal = 0;
  let multiplier = 1;
  let featureCount = 0;
  const selectedIds = new Set<string>();

  for (const step of estimatorSteps) {
    const chosen = selections[step.id] ?? [];
    for (const id of chosen) {
      const opt = findOption(step.id, id);
      if (!opt) continue;
      selectedIds.add(id);
      if (step.id === "fleet" || step.id === "business") {
        base += opt.cost;
      } else if (step.id === "timeline") {
        multiplier = opt.multiplier ?? 1;
      } else {
        featuresTotal += opt.cost;
        featureCount += 1;
      }
    }
  }

  // Baseline platform (design system, core booking scaffold) always included.
  const platformBaseline = 90000;
  const subtotal = (platformBaseline + base + featuresTotal) * multiplier;

  const point = Math.round(subtotal / 1000) * 1000;
  const low = Math.round((point * 0.9) / 1000) * 1000;
  const high = Math.round((point * 1.18) / 1000) * 1000;

  const complexity = Math.min(
    100,
    Math.round(28 + (featureCount / Math.max(1, totalFeatureCount)) * 62 + (multiplier - 1) * 40),
  );

  // Timeline in weeks scales with complexity, compressed by rush multiplier.
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
  if (!selectedIds.has("ai-booking")) upgradeSuggestions.push("Add an AI Booking Assistant to lift conversions 20–30%.");
  if (!selectedIds.has("gps")) upgradeSuggestions.push("GPS integration reduces disputes and enables live tracking.");
  if (!selectedIds.has("android") && !selectedIds.has("ios"))
    upgradeSuggestions.push("A native app dramatically improves repeat-booking retention.");
  if (!selectedIds.has("analytics")) upgradeSuggestions.push("An analytics dashboard pays for itself in pricing decisions.");
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

/** Compact display, e.g. ₹4.2L / ₹1.1Cr. */
export function formatINRCompact(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}
