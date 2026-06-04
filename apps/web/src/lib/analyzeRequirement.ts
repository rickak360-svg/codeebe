import { featureOptions, projectTypes, timelineOptions } from "@/data/pricing";

export type AnalyzedRequirement = {
  projectType: (typeof projectTypes)[number];
  suggestedFeatures: (typeof featureOptions)[number][];
  timeline: (typeof timelineOptions)[number];
  reasoning: string[];
};

const PROJECT_KEYWORDS: Record<(typeof projectTypes)[number], string[]> = {
  "Landing Page": ["landing", "single page", "lead capture page"],
  "Business Website": ["business website", "company site", "corporate", "brochure"],
  "WordPress Website": ["wordpress", "cms", "blog"],
  eCommerce: ["ecommerce", "e-commerce", "shop", "store", "cart", "checkout"],
  "SaaS MVP": ["saas", "subscription", "mvp", "b2b software", "platform"],
  Marketplace: ["marketplace", "vendors", "two-sided", "buyers and sellers"],
  "CRM/Admin Dashboard": ["crm", "admin dashboard", "internal tool", "operations panel"],
  "Booking Platform": ["booking", "appointments", "scheduling", "reservation"],
  "Automation Workflow": ["automation", "workflow", "integrate", "zapier", "n8n"],
  "Custom Software": ["custom", "portal", "application"],
};

const FEATURE_KEYWORDS: Partial<
  Record<(typeof featureOptions)[number], string[]>
> = {
  "Login/Auth": ["login", "auth", "sign up", "user account", "sso"],
  "Admin Panel": ["admin", "back office", "dashboard", "manage users"],
  "Payment Gateway": ["payment", "stripe", "razorpay", "billing", "checkout"],
  "Booking/Calendar": ["booking", "calendar", "appointment", "schedule"],
  "WhatsApp Integration": ["whatsapp"],
  "Email Automation": ["email", "newsletter", "notification"],
  "Blog/CMS": ["blog", "content", "cms", "articles"],
  "Product Management": ["catalog", "products", "inventory", "sku"],
  "User Dashboard": ["user dashboard", "customer portal", "profile"],
  Analytics: ["analytics", "reports", "metrics", "tracking"],
  "API Integration": ["api", "integration", "webhook", "third party"],
  "SEO Setup": ["seo", "search", "google ranking"],
};

function scoreKeywords(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  return keywords.reduce((score, kw) => (lower.includes(kw) ? score + 1 : score), 0);
}

export function analyzeRequirement(description: string): AnalyzedRequirement {
  const text = description.trim();
  const reasoning: string[] = [];

  let bestType: (typeof projectTypes)[number] = "Custom Software";
  let bestScore = 0;

  for (const type of projectTypes) {
    const score = scoreKeywords(text, PROJECT_KEYWORDS[type]);
    if (score > bestScore) {
      bestScore = score;
      bestType = type;
    }
  }

  if (bestScore === 0) {
    if (/\b(app|software|build)\b/i.test(text)) {
      bestType = "SaaS MVP";
      reasoning.push("Detected product-style language — suggested SaaS MVP.");
    } else {
      bestType = "Business Website";
      reasoning.push("General business scope — suggested Business Website.");
    }
  } else {
    reasoning.push(`Matched keywords for ${bestType}.`);
  }

  const suggestedFeatures: AnalyzedRequirement["suggestedFeatures"] = [];
  for (const feature of featureOptions) {
    const keywords = FEATURE_KEYWORDS[feature];
    if (keywords && scoreKeywords(text, keywords) > 0) {
      suggestedFeatures.push(feature);
    }
  }

  if (suggestedFeatures.length === 0) {
    suggestedFeatures.push("Login/Auth", "Admin Panel");
    reasoning.push("Added core modules as a sensible MVP starting point.");
  }

  let timeline: AnalyzedRequirement["timeline"] = "Standard: 3-5 weeks";
  if (/\burgent|asap|quick|fast\b/i.test(text)) {
    timeline = "Urgent: 1-2 weeks";
    reasoning.push("Timeline set to urgent based on your wording.");
  } else if (/\bflexible|no rush|phase|later\b/i.test(text)) {
    timeline = "Flexible: 6+ weeks";
    reasoning.push("Timeline set to flexible based on your wording.");
  }

  return {
    projectType: bestType,
    suggestedFeatures: suggestedFeatures.slice(0, 8),
    timeline,
    reasoning,
  };
}

/** Mirrors API base pricing for hero preview only. */
const PREVIEW_PRICING: Record<string, [number, number]> = {
  "Landing Page": [12_000, 30_000],
  "Business Website": [25_000, 70_000],
  "WordPress Website": [20_000, 65_000],
  eCommerce: [50_000, 150_000],
  "SaaS MVP": [150_000, 500_000],
  Marketplace: [250_000, 800_000],
  "CRM/Admin Dashboard": [75_000, 300_000],
  "Booking Platform": [60_000, 200_000],
  "Automation Workflow": [30_000, 150_000],
  "Custom Software": [100_000, 600_000],
};

export function previewEstimateRange(
  projectType: string,
  featureCount: number,
  timeline: string,
): { min: number; max: number } {
  const [baseMin, baseMax] =
    PREVIEW_PRICING[projectType] ?? PREVIEW_PRICING["Custom Software"];
  let multiplier = 1;
  if (featureCount >= 8) multiplier = 1.4;
  else if (featureCount >= 4) multiplier = 1.2;
  if (timeline.startsWith("Urgent")) multiplier *= 1.2;
  return {
    min: Math.round(baseMin * multiplier),
    max: Math.round(baseMax * multiplier),
  };
}

export function formatInrCompact(n: number): string {
  if (n >= 100_000) {
    const lakhs = n / 100_000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)}L`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}
