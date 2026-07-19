export type PackageId = "web-development" | "ecommerce" | "all-services";

export type PackageFeature = {
  label: string;
  included: boolean;
};

export type PackageTier = {
  id: PackageId;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  priceFrom: string;
  priceNote: string;
  timeline: string;
  popular?: boolean;
  description: string;
  features: PackageFeature[];
  highlights: string[];
  bestFor: string[];
  ctaHref: string;
};

export const packages: PackageTier[] = [
  {
    id: "web-development",
    name: "Web Development",
    tagline: "Launch-ready business sites",
    icon: "language",
    color: "#3b82f6",
    priceFrom: "₹45,000",
    priceNote: "starting from",
    timeline: "2–4 weeks",
    description:
      "A polished marketing or business website with modern UI, CMS-ready pages, and SEO foundations — built to convert visitors into leads.",
    features: [
      { label: "Custom responsive design", included: true },
      { label: "Up to 8 pages", included: true },
      { label: "Contact / lead forms", included: true },
      { label: "SEO & performance setup", included: true },
      { label: "CMS / content editing", included: true },
      { label: "Analytics integration", included: true },
      { label: "E-commerce checkout", included: false },
      { label: "Multi-vendor marketplace", included: false },
      { label: "Custom SaaS / admin panel", included: false },
      { label: "AI automation workflows", included: false },
    ],
    highlights: [
      "Mobile-first UI",
      "Fast Core Web Vitals",
      "Lead capture ready",
      "2 weeks post-launch support",
    ],
    bestFor: ["Agencies", "Local businesses", "Startups", "Portfolio brands"],
    ctaHref: "/estimate",
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    tagline: "Sell online with confidence",
    icon: "storefront",
    color: "#10b981",
    priceFrom: "₹95,000",
    priceNote: "starting from",
    timeline: "4–7 weeks",
    popular: true,
    description:
      "A conversion-focused online store with product catalog, cart, payments, and order management — Shopify, WooCommerce, or custom Next.js.",
    features: [
      { label: "Custom responsive design", included: true },
      { label: "Up to 8 pages", included: true },
      { label: "Contact / lead forms", included: true },
      { label: "SEO & performance setup", included: true },
      { label: "CMS / content editing", included: true },
      { label: "Analytics integration", included: true },
      { label: "E-commerce checkout", included: true },
      { label: "Payment gateway (Razorpay / Stripe)", included: true },
      { label: "Order & inventory basics", included: true },
      { label: "Multi-vendor marketplace", included: false },
      { label: "Custom SaaS / admin panel", included: false },
      { label: "AI automation workflows", included: false },
    ],
    highlights: [
      "Product catalog & cart",
      "Secure payments",
      "Order tracking",
      "Admin product management",
    ],
    bestFor: ["D2C brands", "Retail shops", "Catalog sellers", "Service + product mixes"],
    ctaHref: "/estimate",
  },
  {
    id: "all-services",
    name: "All Services",
    tagline: "Full product engineering",
    icon: "widgets",
    color: "#ff6b00",
    priceFrom: "₹2,50,000",
    priceNote: "starting from",
    timeline: "6–12 weeks",
    description:
      "End-to-end build covering web, mobile, APIs, AI workflows, and ops — ideal when you need a complete product team, not just a website.",
    features: [
      { label: "Custom responsive design", included: true },
      { label: "Unlimited scoped pages / modules", included: true },
      { label: "Contact / lead forms", included: true },
      { label: "SEO & performance setup", included: true },
      { label: "CMS / content editing", included: true },
      { label: "Analytics & dashboards", included: true },
      { label: "E-commerce / marketplace", included: true },
      { label: "Payment & subscription billing", included: true },
      { label: "Custom SaaS / admin panel", included: true },
      { label: "APIs & backend systems", included: true },
      { label: "Mobile app (React Native)", included: true },
      { label: "AI automation workflows", included: true },
    ],
    highlights: [
      "Dedicated delivery squad",
      "Architecture & SRS included",
      "DevOps & deployment",
      "Priority support window",
    ],
    bestFor: ["SaaS founders", "Marketplaces", "Complex ops tools", "Scale-ups"],
    ctaHref: "/estimate",
  },
];

/** Flatten unique feature labels for comparison table (order preserved from All Services). */
export const comparisonFeatureLabels: string[] = [
  "Custom responsive design",
  "SEO & performance setup",
  "CMS / content editing",
  "E-commerce checkout",
  "Payment gateway",
  "Order & inventory",
  "Custom SaaS / admin panel",
  "APIs & backend systems",
  "Mobile application",
  "AI automation workflows",
];

export function packageHasFeature(pkg: PackageTier, label: string): boolean {
  const aliases: Record<string, string[]> = {
    "Payment gateway": ["Payment gateway (Razorpay / Stripe)", "Payment & subscription billing"],
    "Order & inventory": ["Order & inventory basics"],
    "E-commerce checkout": ["E-commerce checkout", "E-commerce / marketplace"],
    "Mobile application": ["Mobile app (React Native)"],
    "Analytics & dashboards": ["Analytics integration", "Analytics & dashboards"],
    "Custom SaaS / admin panel": ["Custom SaaS / admin panel"],
    "APIs & backend systems": ["APIs & backend systems"],
    "AI automation workflows": ["AI automation workflows"],
    "CMS / content editing": ["CMS / content editing"],
    "SEO & performance setup": ["SEO & performance setup"],
    "Custom responsive design": ["Custom responsive design"],
  };

  const matchLabels = aliases[label] ?? [label];
  return pkg.features.some((f) => f.included && matchLabels.includes(f.label));
}
