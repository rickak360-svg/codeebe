export type PackageId =
  | "consulting-sites"
  | "book-appointment"
  | "ecommerce"
  | "car-rental"
  | "management-system";

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
    id: "consulting-sites",
    name: "Consulting Sites",
    tagline: "Trust-building informational sites",
    icon: "business_center",
    color: "#3b82f6",
    priceFrom: "₹10,000",
    priceNote: "starting from",
    timeline: "10–20 days",
    description:
      "Professional consulting and informational websites with responsive design, lead capture, and optional blog — Basics or Professional.",
    features: [
      { label: "Mobile-responsive layout", included: true },
      { label: "Up to 5–12 pages", included: true },
      { label: "Lead capture forms", included: true },
      { label: "1 year hosting", included: true },
      { label: "45 days support", included: true },
      { label: "Custom UI design", included: true },
      { label: "Online booking engine", included: false },
      { label: "Payment gateway", included: false },
      { label: "Fleet / inventory modules", included: false },
      { label: "Admin dashboard / ERP", included: false },
    ],
    highlights: [
      "5–12 page sites",
      "Lead capture ready",
      "1 year hosting",
      "45 days support",
    ],
    bestFor: ["Consultants", "Agencies", "Local businesses", "Portfolio brands"],
    ctaHref: "/packages#plans",
  },
  {
    id: "book-appointment",
    name: "Book Appointment",
    tagline: "Online booking that runs itself",
    icon: "event_available",
    color: "#8b5cf6",
    priceFrom: "₹18,000",
    priceNote: "starting from",
    timeline: "12–25 days",
    description:
      "Booking sites with calendar sync, service catalogs, and optional multi-staff scheduling plus payment gateway.",
    features: [
      { label: "Mobile-responsive layout", included: true },
      { label: "Online booking engine", included: true },
      { label: "Calendar sync", included: true },
      { label: "1 year hosting", included: true },
      { label: "45 days support", included: true },
      { label: "Payment gateway", included: true },
      { label: "Multi-staff / location", included: true },
      { label: "Fleet / inventory modules", included: false },
      { label: "Admin dashboard / ERP", included: false },
      { label: "Product catalog (100+)", included: false },
    ],
    highlights: [
      "Booking engine",
      "Calendar sync",
      "Payment-ready Pro plan",
      "1 year hosting",
    ],
    bestFor: ["Clinics", "Salons", "Consultants", "Service businesses"],
    ctaHref: "/packages#plans",
  },
  {
    id: "ecommerce",
    name: "eCommerce Site",
    tagline: "Sell online with confidence",
    icon: "storefront",
    color: "#10b981",
    priceFrom: "₹20,000",
    priceNote: "starting from",
    timeline: "15–40 days",
    popular: true,
    description:
      "CMS stores (WooCommerce / Shopify) or custom high-performance checkout builds — up to 100 products on CMS, full stack on Custom.",
    features: [
      { label: "Mobile-responsive layout", included: true },
      { label: "Product catalog", included: true },
      { label: "Payment gateway", included: true },
      { label: "1 year hosting", included: true },
      { label: "45–60 days support", included: true },
      { label: "CMS (WooCommerce / Shopify)", included: true },
      { label: "Custom checkout architecture", included: true },
      { label: "Online booking engine", included: false },
      { label: "Fleet / inventory modules", included: false },
      { label: "Admin dashboard / ERP", included: false },
    ],
    highlights: [
      "CMS from ₹20,000",
      "Custom from ₹50,000",
      "Gateway integration",
      "1 year hosting",
    ],
    bestFor: ["D2C brands", "Retail shops", "Catalog sellers"],
    ctaHref: "/packages#plans",
  },
  {
    id: "car-rental",
    name: "Car Rental Site",
    tagline: "Fleet listings to full ops",
    icon: "directions_car",
    color: "#f59e0b",
    priceFrom: "₹20,000",
    priceNote: "starting from",
    timeline: "15–50 days",
    description:
      "From fleet listing and inquiry forms to real-time availability, deposits, and enterprise fleet management with GPS.",
    features: [
      { label: "Mobile-responsive layout", included: true },
      { label: "Fleet listing & search", included: true },
      { label: "1 year hosting", included: true },
      { label: "45–60 days support", included: true },
      { label: "Availability calendar", included: true },
      { label: "Deposit calculation", included: true },
      { label: "Fleet management suite", included: true },
      { label: "Payment gateway", included: true },
      { label: "Online booking engine", included: false },
      { label: "Admin dashboard / ERP", included: false },
    ],
    highlights: [
      "Basics → Enterprise",
      "₹20k – ₹90k",
      "Availability & deposits",
      "GPS on Enterprise",
    ],
    bestFor: ["Rental fleets", "Travel operators", "Car dealers"],
    ctaHref: "/packages#plans",
  },
  {
    id: "management-system",
    name: "Management System",
    tagline: "Dashboards to full ERP/CRM",
    icon: "dashboard",
    color: "#ff6b00",
    priceFrom: "₹40,000",
    priceNote: "starting from",
    timeline: "25–65 days",
    description:
      "Core admin dashboards with roles, workflow automation, analytics, or full ERP/CRM custom modules with enterprise database setup.",
    features: [
      { label: "Mobile-responsive layout", included: true },
      { label: "Admin dashboard", included: true },
      { label: "User roles & permissions", included: true },
      { label: "1 year hosting", included: true },
      { label: "45–90 days support", included: true },
      { label: "Workflow automation", included: true },
      { label: "Multi-department analytics", included: true },
      { label: "Custom ERP / CRM modules", included: true },
      { label: "Online booking engine", included: false },
      { label: "Fleet listing & search", included: false },
    ],
    highlights: [
      "Basics → Enterprise",
      "₹40k – ₹1,00,000",
      "Roles & workflows",
      "Up to 90 days support",
    ],
    bestFor: ["Ops teams", "SMEs", "Multi-department orgs"],
    ctaHref: "/packages#plans",
  },
];

/** Flatten unique feature labels for comparison table. */
export const comparisonFeatureLabels: string[] = [
  "Mobile-responsive layout",
  "1 year hosting",
  "Lead capture forms",
  "Online booking engine",
  "Payment gateway",
  "Product catalog",
  "Fleet listing & search",
  "Admin dashboard",
  "Workflow automation",
  "Custom ERP / CRM modules",
];

export function packageHasFeature(pkg: PackageTier, label: string): boolean {
  const aliases: Record<string, string[]> = {
    "Lead capture forms": ["Lead capture forms", "Custom UI design"],
    "Product catalog": ["Product catalog", "CMS (WooCommerce / Shopify)"],
    "45 days support": ["45 days support", "45–60 days support", "45–90 days support"],
  };

  const matchLabels = aliases[label] ?? [label];
  return pkg.features.some((f) => f.included && matchLabels.includes(f.label));
}
