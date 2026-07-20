export type ServiceId =
  | "web-development"
  | "ecommerce"
  | "saas"
  | "ai-solutions"
  | "mobile-apps"
  | "cloud-devops";

export type PackageTierId = "basic" | "professional" | "enterprise";

export type BuildApproachId = "cms" | "custom";

export type ConfigStep = 1 | 2 | 3 | 4;

export type BuildApproach = {
  id: BuildApproachId;
  label: string;
  description: string;
  icon: string;
  platforms: string[];
  priceMultiplier: number;
  timelineMultiplier: number;
  savingsLabel?: string;
};

export type Service = {
  id: ServiceId;
  title: string;
  description: string;
  icon: string;
  emoji: string;
  startingPrice: number;
  baseWeeks: number;
};

export type ProjectType = {
  id: string;
  label: string;
  priceMultiplier: number;
  timelineMultiplier: number;
};

export type ComparisonRow = {
  key: string;
  label: string;
};

export type PackageTier = {
  id: PackageTierId;
  name: string;
  badge: string;
  tagline: string;
  highlights: string[];
  priceMultiplier: number;
  timelineMultiplier: number;
  popular?: boolean;
  features: Record<string, boolean | string>;
};

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description: "High-converting websites and web apps built for growth.",
    icon: "language",
    emoji: "🌐",
    startingPrice: 25000,
    baseWeeks: 3,
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description: "Online stores engineered for sales, scale, and retention.",
    icon: "storefront",
    emoji: "🛒",
    startingPrice: 49000,
    baseWeeks: 5,
  },
  {
    id: "saas",
    title: "SaaS Development",
    description: "Subscription-ready products with auth, billing, and dashboards.",
    icon: "cloud",
    emoji: "⚡",
    startingPrice: 99000,
    baseWeeks: 8,
  },
  {
    id: "ai-solutions",
    title: "AI Solutions",
    description: "Intelligent automation, chatbots, and custom AI integrations.",
    icon: "smart_toy",
    emoji: "🤖",
    startingPrice: 69000,
    baseWeeks: 6,
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    description: "Native and cross-platform apps with polished UX.",
    icon: "smartphone",
    emoji: "📱",
    startingPrice: 89000,
    baseWeeks: 7,
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Infrastructure, CI/CD, and cloud-native architecture.",
    icon: "cloud_sync",
    emoji: "☁️",
    startingPrice: 39000,
    baseWeeks: 4,
  },
];

export const buildApproachesByService: Partial<Record<ServiceId, BuildApproach[]>> = {
  "web-development": [
    {
      id: "cms",
      label: "CMS Website",
      description: "WordPress or Webflow — faster launch with easy content management.",
      icon: "web",
      platforms: ["WordPress", "Webflow"],
      priceMultiplier: 0.72,
      timelineMultiplier: 0.85,
      savingsLabel: "Budget friendly",
    },
    {
      id: "custom",
      label: "Custom Build",
      description: "Hand-coded Next.js / React — full control, premium performance.",
      icon: "code",
      platforms: ["Next.js", "React"],
      priceMultiplier: 1.35,
      timelineMultiplier: 1.2,
    },
  ],
  ecommerce: [
    {
      id: "cms",
      label: "CMS Store",
      description: "Shopify or WooCommerce — proven checkout, quicker go-live.",
      icon: "store",
      platforms: ["Shopify", "WooCommerce"],
      priceMultiplier: 0.75,
      timelineMultiplier: 0.88,
      savingsLabel: "Budget friendly",
    },
    {
      id: "custom",
      label: "Custom Store",
      description: "Custom-built store on Next.js — unlimited features & scalability.",
      icon: "shopping_cart",
      platforms: ["Next.js", "Headless"],
      priceMultiplier: 1.4,
      timelineMultiplier: 1.25,
    },
  ],
};

export function serviceNeedsBuildApproach(serviceId: ServiceId): boolean {
  return serviceId in buildApproachesByService;
}

export function getBuildApproaches(serviceId: ServiceId): BuildApproach[] {
  return buildApproachesByService[serviceId] ?? [];
}

export function getBuildApproach(serviceId: ServiceId, buildApproachId: BuildApproachId) {
  return getBuildApproaches(serviceId).find((b) => b.id === buildApproachId);
}

export const projectTypesByService: Record<ServiceId, ProjectType[]> = {
  "web-development": [
    { id: "landing-page", label: "Landing Page", priceMultiplier: 0.85, timelineMultiplier: 0.75 },
    { id: "business-website", label: "Business Website", priceMultiplier: 1, timelineMultiplier: 1 },
    { id: "corporate-website", label: "Corporate Website", priceMultiplier: 1.35, timelineMultiplier: 1.2 },
    { id: "portfolio", label: "Portfolio", priceMultiplier: 0.9, timelineMultiplier: 0.85 },
    { id: "restaurant-website", label: "Restaurant Website", priceMultiplier: 1.1, timelineMultiplier: 1 },
    { id: "real-estate-website", label: "Real Estate Website", priceMultiplier: 1.25, timelineMultiplier: 1.15 },
    { id: "booking-website", label: "Booking Website", priceMultiplier: 1.4, timelineMultiplier: 1.25 },
    { id: "healthcare-website", label: "Healthcare Website", priceMultiplier: 1.3, timelineMultiplier: 1.2 },
    { id: "education-website", label: "Education Website", priceMultiplier: 1.2, timelineMultiplier: 1.1 },
    { id: "custom-web-app", label: "Custom Web Application", priceMultiplier: 1.85, timelineMultiplier: 1.5 },
  ],
  ecommerce: [
    { id: "fashion-store", label: "Fashion Store", priceMultiplier: 1, timelineMultiplier: 1 },
    { id: "grocery", label: "Grocery", priceMultiplier: 1.15, timelineMultiplier: 1.1 },
    { id: "medicine", label: "Medicine", priceMultiplier: 1.25, timelineMultiplier: 1.15 },
    { id: "electronics", label: "Electronics", priceMultiplier: 1.1, timelineMultiplier: 1.05 },
    { id: "jewelry", label: "Jewelry", priceMultiplier: 1.05, timelineMultiplier: 1 },
    { id: "furniture", label: "Furniture", priceMultiplier: 1.1, timelineMultiplier: 1.05 },
    { id: "wholesale", label: "Wholesale", priceMultiplier: 1.35, timelineMultiplier: 1.2 },
    { id: "multi-vendor", label: "Multi Vendor", priceMultiplier: 1.65, timelineMultiplier: 1.4 },
    { id: "b2b-ecommerce", label: "B2B Ecommerce", priceMultiplier: 1.5, timelineMultiplier: 1.3 },
    { id: "custom-store", label: "Custom Store", priceMultiplier: 1.9, timelineMultiplier: 1.55 },
  ],
  saas: [
    { id: "crm", label: "CRM", priceMultiplier: 1, timelineMultiplier: 1 },
    { id: "erp", label: "ERP", priceMultiplier: 1.6, timelineMultiplier: 1.45 },
    { id: "hrms", label: "HRMS", priceMultiplier: 1.35, timelineMultiplier: 1.25 },
    { id: "booking-saas", label: "Booking SaaS", priceMultiplier: 1.15, timelineMultiplier: 1.1 },
    { id: "marketplace", label: "Marketplace", priceMultiplier: 1.75, timelineMultiplier: 1.5 },
    { id: "learning-platform", label: "Learning Platform", priceMultiplier: 1.4, timelineMultiplier: 1.3 },
    { id: "subscription-saas", label: "Subscription SaaS", priceMultiplier: 1.25, timelineMultiplier: 1.15 },
    { id: "ai-saas", label: "AI SaaS", priceMultiplier: 1.55, timelineMultiplier: 1.35 },
    { id: "internal-dashboard", label: "Internal Dashboard", priceMultiplier: 1.1, timelineMultiplier: 1.05 },
    { id: "custom-saas", label: "Custom SaaS", priceMultiplier: 2, timelineMultiplier: 1.65 },
  ],
  "ai-solutions": [
    { id: "ai-chatbot", label: "AI Chatbot", priceMultiplier: 0.9, timelineMultiplier: 0.85 },
    { id: "document-ai", label: "Document AI", priceMultiplier: 1.15, timelineMultiplier: 1.1 },
    { id: "recommendation-engine", label: "Recommendation Engine", priceMultiplier: 1.25, timelineMultiplier: 1.15 },
    { id: "computer-vision", label: "Computer Vision", priceMultiplier: 1.4, timelineMultiplier: 1.25 },
    { id: "process-automation", label: "Process Automation", priceMultiplier: 1.1, timelineMultiplier: 1.05 },
    { id: "ai-saas-product", label: "AI SaaS Product", priceMultiplier: 1.65, timelineMultiplier: 1.45 },
    { id: "custom-ai-integration", label: "Custom AI Integration", priceMultiplier: 1.35, timelineMultiplier: 1.2 },
    { id: "voice-assistant", label: "Voice Assistant", priceMultiplier: 1.3, timelineMultiplier: 1.2 },
    { id: "data-analytics-ai", label: "Data Analytics AI", priceMultiplier: 1.2, timelineMultiplier: 1.1 },
    { id: "enterprise-ai", label: "Enterprise AI Platform", priceMultiplier: 1.9, timelineMultiplier: 1.6 },
  ],
  "mobile-apps": [
    { id: "ios-app", label: "iOS App", priceMultiplier: 1, timelineMultiplier: 1 },
    { id: "android-app", label: "Android App", priceMultiplier: 1, timelineMultiplier: 1 },
    { id: "cross-platform", label: "Cross-Platform App", priceMultiplier: 1.2, timelineMultiplier: 1.1 },
    { id: "ecommerce-app", label: "E-Commerce App", priceMultiplier: 1.35, timelineMultiplier: 1.2 },
    { id: "on-demand-app", label: "On-Demand App", priceMultiplier: 1.45, timelineMultiplier: 1.3 },
    { id: "social-app", label: "Social App", priceMultiplier: 1.55, timelineMultiplier: 1.35 },
    { id: "fitness-health", label: "Fitness & Health", priceMultiplier: 1.2, timelineMultiplier: 1.1 },
    { id: "food-delivery", label: "Food Delivery", priceMultiplier: 1.4, timelineMultiplier: 1.25 },
    { id: "fintech-app", label: "Fintech App", priceMultiplier: 1.6, timelineMultiplier: 1.4 },
    { id: "custom-mobile", label: "Custom Mobile App", priceMultiplier: 1.85, timelineMultiplier: 1.55 },
  ],
  "cloud-devops": [
    { id: "cloud-migration", label: "Cloud Migration", priceMultiplier: 1.2, timelineMultiplier: 1.15 },
    { id: "cicd-pipeline", label: "CI/CD Pipeline", priceMultiplier: 0.95, timelineMultiplier: 0.9 },
    { id: "kubernetes", label: "Kubernetes Setup", priceMultiplier: 1.35, timelineMultiplier: 1.2 },
    { id: "serverless", label: "Serverless Architecture", priceMultiplier: 1.15, timelineMultiplier: 1.05 },
    { id: "aws-gcp-setup", label: "AWS / GCP Setup", priceMultiplier: 1.1, timelineMultiplier: 1 },
    { id: "devops-consulting", label: "DevOps Consulting", priceMultiplier: 0.85, timelineMultiplier: 0.8 },
    { id: "monitoring-logging", label: "Monitoring & Logging", priceMultiplier: 0.9, timelineMultiplier: 0.85 },
    { id: "security-hardening", label: "Security Hardening", priceMultiplier: 1.1, timelineMultiplier: 1 },
    { id: "infrastructure-code", label: "Infrastructure as Code", priceMultiplier: 1.05, timelineMultiplier: 1 },
    { id: "custom-devops", label: "Custom DevOps", priceMultiplier: 1.5, timelineMultiplier: 1.35 },
  ],
};

export const comparisonRows: ComparisonRow[] = [
  { key: "pages", label: "Pages" },
  { key: "design", label: "Design" },
  { key: "responsive", label: "Responsive" },
  { key: "seo", label: "SEO" },
  { key: "cms", label: "CMS" },
  { key: "adminPanel", label: "Admin Panel" },
  { key: "paymentGateway", label: "Payment Gateway" },
  { key: "authentication", label: "Authentication" },
  { key: "apiIntegration", label: "API Integration" },
  { key: "dashboard", label: "Dashboard" },
  { key: "analytics", label: "Analytics" },
  { key: "security", label: "Security" },
  { key: "performance", label: "Performance" },
  { key: "hostingSupport", label: "Hosting Support" },
  { key: "maintenance", label: "Maintenance" },
  { key: "support", label: "Support" },
];

const basicFeatures: Record<string, boolean | string> = {
  pages: "Up to 5",
  design: "Template-based",
  responsive: true,
  seo: "Basic",
  cms: false,
  adminPanel: false,
  paymentGateway: false,
  authentication: false,
  apiIntegration: false,
  dashboard: false,
  analytics: "Basic",
  security: "Standard",
  performance: "Optimized",
  hostingSupport: "3 months",
  maintenance: "1 month",
  support: "Email",
};

const professionalFeatures: Record<string, boolean | string> = {
  pages: "Up to 15",
  design: "Custom",
  responsive: true,
  seo: "Advanced",
  cms: true,
  adminPanel: true,
  paymentGateway: true,
  authentication: true,
  apiIntegration: "Standard",
  dashboard: true,
  analytics: "Advanced",
  security: "Enhanced",
  performance: "Premium",
  hostingSupport: "6 months",
  maintenance: "3 months",
  support: "Priority",
};

const enterpriseFeatures: Record<string, boolean | string> = {
  pages: "Unlimited",
  design: "Bespoke",
  responsive: true,
  seo: "Enterprise",
  cms: true,
  adminPanel: true,
  paymentGateway: true,
  authentication: true,
  apiIntegration: "Custom",
  dashboard: true,
  analytics: "Custom",
  security: "Enterprise-grade",
  performance: "Maximum",
  hostingSupport: "12 months",
  maintenance: "6 months",
  support: "Dedicated",
};

export const packageTiers: PackageTier[] = [
  {
    id: "basic",
    name: "Basic",
    badge: "Budget Friendly",
    tagline: "Best for startups",
    highlights: ["Small businesses", "Landing pages", "Simple websites"],
    priceMultiplier: 1,
    timelineMultiplier: 1,
    features: basicFeatures,
  },
  {
    id: "professional",
    name: "Professional",
    badge: "Most Popular",
    tagline: "Recommended",
    highlights: ["Growing teams", "Custom design", "Full feature set"],
    priceMultiplier: 1.5,
    timelineMultiplier: 1.25,
    popular: true,
    features: professionalFeatures,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: "Enterprise",
    tagline: "Built for scale",
    highlights: ["Large organizations", "Custom systems", "Dedicated team", "Priority support"],
    priceMultiplier: 2,
    timelineMultiplier: 1.55,
    features: enterpriseFeatures,
  },
];

export function formatINR(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    const rounded = Math.round(lakhs * 10) / 10;
    return rounded % 1 === 0 ? `₹${rounded}L` : `₹${rounded.toFixed(1)}L`;
  }
  const rounded = Math.round(amount / 1000) * 1000;
  return `₹${rounded.toLocaleString("en-IN")}`;
}

export function calculateEstimate(
  serviceId: ServiceId,
  projectTypeId: string,
  packageId: PackageTierId,
  buildApproachId?: BuildApproachId | null,
) {
  const service = services.find((s) => s.id === serviceId)!;
  const projectType = projectTypesByService[serviceId].find((p) => p.id === projectTypeId)!;
  const pkg = packageTiers.find((p) => p.id === packageId)!;
  const buildApproach =
    buildApproachId && serviceNeedsBuildApproach(serviceId)
      ? getBuildApproach(serviceId, buildApproachId)
      : null;

  const price = Math.round(
    service.startingPrice *
      projectType.priceMultiplier *
      pkg.priceMultiplier *
      (buildApproach?.priceMultiplier ?? 1),
  );

  const weeks = Math.max(
    2,
    Math.round(
      service.baseWeeks *
        projectType.timelineMultiplier *
        pkg.timelineMultiplier *
        (buildApproach?.timelineMultiplier ?? 1),
    ),
  );

  const timeline = weeks === 1 ? "1 Week" : `${weeks} Weeks`;

  return { price, priceFormatted: formatINR(price), timeline, weeks };
}

export function getService(id: ServiceId) {
  return services.find((s) => s.id === id);
}

export function getProjectType(serviceId: ServiceId, projectTypeId: string) {
  return projectTypesByService[serviceId].find((p) => p.id === projectTypeId);
}

export function getPackageTier(id: PackageTierId) {
  return packageTiers.find((p) => p.id === id);
}

export function buildEstimateUrl(
  serviceId: ServiceId,
  projectTypeId: string,
  packageId: PackageTierId,
  buildApproachId?: BuildApproachId | null,
) {
  const estimate = calculateEstimate(serviceId, projectTypeId, packageId, buildApproachId);
  const params = new URLSearchParams({
    service: serviceId,
    project: projectTypeId,
    package: packageId,
    price: String(estimate.price),
    timeline: estimate.timeline,
  });
  if (buildApproachId) params.set("build", buildApproachId);
  return `/packages/inquiry?${params.toString()}`;
}

export function buildContactUrl(
  serviceId: ServiceId,
  projectTypeId: string,
  packageId: PackageTierId,
  buildApproachId?: BuildApproachId | null,
) {
  const params = new URLSearchParams({
    service: serviceId,
    project: projectTypeId,
    package: packageId,
  });
  if (buildApproachId) params.set("build", buildApproachId);
  return `/contact?${params.toString()}`;
}
