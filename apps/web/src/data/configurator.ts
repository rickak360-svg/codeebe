export type ServiceId =
  | "consulting-sites"
  | "book-appointment"
  | "ecommerce"
  | "car-rental"
  | "management-system";

export type PlanId =
  | "basics"
  | "professional"
  | "enterprise"
  | "cms"
  | "custom";

export type ConfigStep = 1 | 2;

export type ServicePlan = {
  id: PlanId;
  name: string;
  badge: string;
  tagline: string;
  deliverables: string;
  highlights: string[];
  timeline: string;
  hosting: string;
  support: string;
  price: number;
  popular?: boolean;
};

export type Service = {
  id: ServiceId;
  title: string;
  description: string;
  icon: string;
  emoji: string;
  startingPrice: number;
  plans: ServicePlan[];
};

export const services: Service[] = [
  {
    id: "consulting-sites",
    title: "Consulting Sites",
    description: "Informational sites that establish trust and capture leads.",
    icon: "business_center",
    emoji: "💼",
    startingPrice: 10000,
    plans: [
      {
        id: "basics",
        name: "Basics",
        badge: "Starter",
        tagline: "Clean, professional presence",
        deliverables:
          "Standard 5-page informational site, mobile-responsive layout",
        highlights: [
          "Up to 5 pages",
          "Mobile-responsive layout",
          "Contact / inquiry form",
          "1 year hosting · 45 days support",
        ],
        timeline: "10 – 12 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 10000,
      },
      {
        id: "professional",
        name: "Professional",
        badge: "Most Popular",
        tagline: "Custom design that converts",
        deliverables:
          "Up to 12 pages, custom UI design, lead capture forms, blog",
        highlights: [
          "Up to 12 pages",
          "Custom UI design",
          "Lead capture forms",
          "Blog section",
          "1 year hosting · 45 days support",
        ],
        timeline: "18 – 20 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 25000,
        popular: true,
      },
    ],
  },
  {
    id: "book-appointment",
    title: "Book Appointment",
    description: "Online booking with calendars, services, and automation.",
    icon: "event_available",
    emoji: "📅",
    startingPrice: 18000,
    plans: [
      {
        id: "basics",
        name: "Basics",
        badge: "Starter",
        tagline: "Bookings that run themselves",
        deliverables:
          "Online booking engine, calendar sync, service catalog, automation",
        highlights: [
          "Online booking engine",
          "Calendar sync",
          "Service catalog",
          "Basic automation",
          "1 year hosting · 45 days support",
        ],
        timeline: "12 – 15 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 18000,
      },
      {
        id: "professional",
        name: "Professional",
        badge: "Most Popular",
        tagline: "Multi-staff & payments ready",
        deliverables:
          "Multi-staff/location booking, payment gateway integration",
        highlights: [
          "Multi-staff / location booking",
          "Payment gateway",
          "Advanced scheduling",
          "1 year hosting · 45 days support",
        ],
        timeline: "20 – 25 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 40000,
        popular: true,
      },
    ],
  },
  {
    id: "ecommerce",
    title: "eCommerce Site",
    description: "Online stores engineered for sales, scale, and retention.",
    icon: "storefront",
    emoji: "🛒",
    startingPrice: 20000,
    plans: [
      {
        id: "cms",
        name: "CMS Plan",
        badge: "Budget Friendly",
        tagline: "WooCommerce / Shopify",
        deliverables:
          "Up to 100 products setup, standard gateway integration",
        highlights: [
          "WooCommerce or Shopify",
          "Up to 100 products",
          "Standard payment gateway",
          "1 year hosting · 45 days support",
        ],
        timeline: "15 – 20 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 20000,
        popular: true,
      },
      {
        id: "custom",
        name: "Custom Build",
        badge: "Scale Ready",
        tagline: "Tailored stack & checkout",
        deliverables:
          "Tailored stack/architecture, high-performance checkout",
        highlights: [
          "Custom architecture",
          "High-performance checkout",
          "Full feature flexibility",
          "1 year hosting · 60 days support",
        ],
        timeline: "30 – 40 Days",
        hosting: "1 Year",
        support: "60 Days",
        price: 50000,
      },
    ],
  },
  {
    id: "car-rental",
    title: "Car Rental Site",
    description: "Fleet listings, bookings, and rental operations online.",
    icon: "directions_car",
    emoji: "🚗",
    startingPrice: 20000,
    plans: [
      {
        id: "basics",
        name: "Basics",
        badge: "Starter",
        tagline: "List & inquire",
        deliverables:
          "Fleet listing & search filters, vehicle detail pages, inquiry",
        highlights: [
          "Fleet listing & search",
          "Vehicle detail pages",
          "Inquiry forms",
          "1 year hosting · 45 days support",
        ],
        timeline: "15 – 18 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 20000,
      },
      {
        id: "professional",
        name: "Professional",
        badge: "Most Popular",
        tagline: "Live availability & deposits",
        deliverables:
          "Real-time availability calendar, deposit calculation, location",
        highlights: [
          "Real-time availability",
          "Deposit calculation",
          "Location-based search",
          "1 year hosting · 45 days support",
        ],
        timeline: "25 – 30 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 50000,
        popular: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        badge: "Enterprise",
        tagline: "Full fleet operations suite",
        deliverables:
          "Fleet management suite, dynamic seasonal pricing, GPS",
        highlights: [
          "Fleet management suite",
          "Dynamic seasonal pricing",
          "GPS integration",
          "1 year hosting · 60 days support",
        ],
        timeline: "40 – 50 Days",
        hosting: "1 Year",
        support: "60 Days",
        price: 90000,
      },
    ],
  },
  {
    id: "management-system",
    title: "Management System",
    description: "Admin dashboards, workflows, and custom ERP/CRM modules.",
    icon: "dashboard",
    emoji: "📊",
    startingPrice: 40000,
    plans: [
      {
        id: "basics",
        name: "Basics",
        badge: "Starter",
        tagline: "Core admin & roles",
        deliverables:
          "Core admin dashboard, user roles & permissions, data control",
        highlights: [
          "Admin dashboard",
          "User roles & permissions",
          "Data management",
          "1 year hosting · 45 days support",
        ],
        timeline: "25 – 30 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 40000,
      },
      {
        id: "professional",
        name: "Professional",
        badge: "Most Popular",
        tagline: "Workflows & analytics",
        deliverables:
          "Advanced workflow automation, multi-department analytics",
        highlights: [
          "Workflow automation",
          "Multi-department analytics",
          "Advanced reporting",
          "1 year hosting · 60 days support",
        ],
        timeline: "35 – 45 Days",
        hosting: "1 Year",
        support: "60 Days",
        price: 70000,
        popular: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        badge: "Enterprise",
        tagline: "Full ERP / CRM build",
        deliverables:
          "Full ERP/CRM custom module design, enterprise DB cluster",
        highlights: [
          "Custom ERP / CRM modules",
          "Enterprise database setup",
          "Dedicated architecture",
          "1 year hosting · 90 days support",
        ],
        timeline: "50 – 65 Days",
        hosting: "1 Year",
        support: "90 Days",
        price: 100000,
      },
    ],
  },
];

export const SERVICE_IDS: ServiceId[] = services.map((s) => s.id);

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getService(id: ServiceId) {
  return services.find((s) => s.id === id);
}

export function getServicePlans(serviceId: ServiceId): ServicePlan[] {
  return getService(serviceId)?.plans ?? [];
}

export function getPlan(serviceId: ServiceId, planId: PlanId) {
  return getServicePlans(serviceId).find((p) => p.id === planId);
}

export function isPlanIdForService(serviceId: ServiceId, planId: string): planId is PlanId {
  return getServicePlans(serviceId).some((p) => p.id === planId);
}

export function calculateEstimate(serviceId: ServiceId, planId: PlanId) {
  const plan = getPlan(serviceId, planId);
  if (!plan) {
    throw new Error(`Unknown plan ${planId} for service ${serviceId}`);
  }

  return {
    price: plan.price,
    priceFormatted: formatINR(plan.price),
    timeline: plan.timeline,
    hosting: plan.hosting,
    support: plan.support,
    deliverables: plan.deliverables,
  };
}

export function buildEstimateUrl(serviceId: ServiceId, planId: PlanId) {
  const estimate = calculateEstimate(serviceId, planId);
  const params = new URLSearchParams({
    service: serviceId,
    package: planId,
    price: String(estimate.price),
    timeline: estimate.timeline,
  });
  return `/packages/inquiry?${params.toString()}`;
}

export function buildContactUrl(serviceId: ServiceId, planId: PlanId) {
  const params = new URLSearchParams({
    service: serviceId,
    package: planId,
  });
  return `/contact?${params.toString()}`;
}
