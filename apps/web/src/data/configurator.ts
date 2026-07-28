export type ServiceId =
  | "consulting-sites"
  | "book-appointment"
  | "ecommerce"
  | "car-rental"
  | "management-system"
  | "gym"
  | "event-management"
  | "clinic";

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
  {
    id: "gym",
    title: "Gym & Fitness Site",
    description: "Membership plans, class schedules, trainer profiles, and online bookings.",
    icon: "fitness_center",
    emoji: "💪",
    startingPrice: 15000,
    plans: [
      {
        id: "basics",
        name: "Basics",
        badge: "Starter",
        tagline: "Professional gym presence",
        deliverables:
          "5-page gym site, class schedule, trainer profiles, inquiry form",
        highlights: [
          "Up to 5 pages",
          "Class schedule section",
          "Trainer profiles",
          "Contact / inquiry form",
          "1 year hosting · 45 days support",
        ],
        timeline: "10 – 15 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 15000,
      },
      {
        id: "professional",
        name: "Professional",
        badge: "Most Popular",
        tagline: "Memberships & class booking",
        deliverables:
          "Membership plans, online class booking, payment gateway, trainer scheduling",
        highlights: [
          "Membership management",
          "Online class booking",
          "Payment gateway",
          "Trainer booking system",
          "1 year hosting · 45 days support",
        ],
        timeline: "20 – 30 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 35000,
        popular: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        badge: "Full Suite",
        tagline: "Multi-branch gym platform",
        deliverables:
          "Multi-branch management, mobile app integration, loyalty rewards, analytics dashboard",
        highlights: [
          "Multi-branch management",
          "Mobile app integration",
          "Loyalty rewards system",
          "Analytics dashboard",
          "1 year hosting · 60 days support",
        ],
        timeline: "35 – 45 Days",
        hosting: "1 Year",
        support: "60 Days",
        price: 75000,
      },
    ],
  },
  {
    id: "event-management",
    title: "Event Management Site",
    description: "Event listings, online ticketing, registrations, and attendee management.",
    icon: "event",
    emoji: "🎉",
    startingPrice: 18000,
    plans: [
      {
        id: "basics",
        name: "Basics",
        badge: "Starter",
        tagline: "Showcase & capture registrations",
        deliverables:
          "Event listings, registration forms, photo gallery, contact form",
        highlights: [
          "Event listings page",
          "Registration forms",
          "Photo gallery",
          "Contact form",
          "1 year hosting · 45 days support",
        ],
        timeline: "10 – 15 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 18000,
      },
      {
        id: "professional",
        name: "Professional",
        badge: "Most Popular",
        tagline: "Ticketing & payment ready",
        deliverables:
          "Online ticketing, seat selection, payment gateway, QR code check-in",
        highlights: [
          "Online ticketing system",
          "Seat / slot selection",
          "Payment gateway",
          "QR code check-in",
          "1 year hosting · 45 days support",
        ],
        timeline: "20 – 28 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 45000,
        popular: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        badge: "Full Platform",
        tagline: "Multi-event platform & CRM",
        deliverables:
          "Multi-event management, sponsorship portal, attendee CRM, advanced analytics",
        highlights: [
          "Multi-event management",
          "Sponsorship portal",
          "Attendee CRM",
          "Advanced analytics",
          "1 year hosting · 60 days support",
        ],
        timeline: "35 – 50 Days",
        hosting: "1 Year",
        support: "60 Days",
        price: 85000,
      },
    ],
  },
  {
    id: "clinic",
    title: "Clinic & Healthcare Site",
    description: "Doctor profiles, appointment booking, patient management, and HMS.",
    icon: "local_hospital",
    emoji: "🏥",
    startingPrice: 18000,
    plans: [
      {
        id: "basics",
        name: "Basics",
        badge: "Starter",
        tagline: "Professional clinic presence",
        deliverables:
          "Clinic info, doctor profiles, services list, appointment inquiry form",
        highlights: [
          "Doctor profiles",
          "Services list",
          "Appointment inquiry form",
          "Location map",
          "1 year hosting · 45 days support",
        ],
        timeline: "10 – 15 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 18000,
      },
      {
        id: "professional",
        name: "Professional",
        badge: "Most Popular",
        tagline: "Online booking & patient portal",
        deliverables:
          "Online appointment booking, patient portal login, doctor schedule management, SMS reminders",
        highlights: [
          "Online appointment booking",
          "Patient portal login",
          "Doctor schedule management",
          "SMS / email reminders",
          "1 year hosting · 45 days support",
        ],
        timeline: "20 – 30 Days",
        hosting: "1 Year",
        support: "45 Days",
        price: 40000,
        popular: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        badge: "Full HMS",
        tagline: "Complete Hospital Management",
        deliverables:
          "Full HMS with billing, pharmacy module, lab management, multi-department support",
        highlights: [
          "Hospital Management System",
          "Billing & pharmacy module",
          "Lab report management",
          "Multi-department support",
          "1 year hosting · 90 days support",
        ],
        timeline: "45 – 60 Days",
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
