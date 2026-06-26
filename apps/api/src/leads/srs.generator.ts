import type { CreateLeadInput } from './types/lead.types';

export interface SRSDocument {
  title: string;
  version: string;
  generatedAt: string;
  client: { name: string; email: string; phone: string };
  overview: string;
  scope: { included: string[]; outOfScope: string[] };
  functionalRequirements: { id: string; title: string; description: string; priority: 'High' | 'Medium' | 'Low' }[];
  nonFunctionalRequirements: { category: string; requirement: string }[];
  techStack: { frontend: string; backend: string; database: string; hosting: string };
  phases: { phase: number; name: string; duration: string; deliverables: string[] }[];
  deliverables: string[];
  assumptions: string[];
}

export interface MarketComparison {
  summary: string;
  competitors: {
    name: string;
    priceRange: string;
    timeline: string;
    highlights: string[];
    gaps: string[];
  }[];
  codeebe: {
    priceRange: string;
    timeline: string;
    highlights: string[];
  };
  whyCodeebe: string[];
}

const TECH_MAP: Record<string, { frontend: string; backend: string; database: string; hosting: string }> = {
  'WordPress / CMS':           { frontend: 'WordPress + Elementor', backend: 'PHP / WordPress', database: 'MySQL', hosting: 'cPanel / WP Engine' },
  'Shopify':                   { frontend: 'Shopify Liquid + React', backend: 'Shopify APIs', database: 'Shopify DB', hosting: 'Shopify Cloud' },
  'Next.js / React':           { frontend: 'Next.js 14 + Tailwind CSS', backend: 'Node.js / NestJS', database: 'PostgreSQL', hosting: 'Vercel + Railway' },
  'React Native / Flutter':    { frontend: 'React Native / Flutter', backend: 'Node.js / NestJS', database: 'PostgreSQL', hosting: 'Expo / App Store / Play Store' },
  'Custom Stack (Node/Python)': { frontend: 'React / Next.js', backend: 'Node.js or Python FastAPI', database: 'PostgreSQL / MongoDB', hosting: 'AWS / Railway / Render' },
  'No Preference':             { frontend: 'Next.js 14 + Tailwind CSS', backend: 'Node.js / NestJS', database: 'PostgreSQL', hosting: 'Vercel + Railway' },
};

const FEATURE_REQUIREMENTS: Record<string, { title: string; description: string; priority: 'High' | 'Medium' | 'Low' }> = {
  'Login / Auth':          { title: 'Authentication System',      description: 'Secure login/signup with JWT sessions, password reset, email verification, and optional OAuth (Google/GitHub).', priority: 'High' },
  'Admin Panel':           { title: 'Admin Dashboard',            description: 'Role-based admin interface to manage users, content, orders, and system settings.', priority: 'High' },
  'Payment Gateway':       { title: 'Payment Processing',         description: 'Integrate Razorpay / Stripe for one-time payments, subscriptions, and refunds with webhook support.', priority: 'High' },
  'Booking / Calendar':    { title: 'Booking & Calendar System',  description: 'Availability management, time-slot booking, email reminders, and Google Calendar sync.', priority: 'Medium' },
  'WhatsApp Integration':  { title: 'WhatsApp Notifications',     description: 'Automated WhatsApp messages via Twilio or Meta Business API for order updates, OTPs, and reminders.', priority: 'Medium' },
  'Email Automation':      { title: 'Email Automation',           description: 'Transactional emails, drip campaigns, and marketing sequences using Nodemailer or Brevo.', priority: 'Medium' },
  'Blog / CMS':            { title: 'Content Management (CMS)',   description: 'Headless CMS integration or custom blog engine with rich text editor, tags, and SEO metadata.', priority: 'Low' },
  'Product Management':    { title: 'Product & Inventory',        description: 'Product catalog, variant management, inventory tracking, and bulk operations.', priority: 'High' },
  'User Dashboard':        { title: 'User Dashboard',             description: 'Personalised dashboard showing activity, orders, stats, and account management tools.', priority: 'Medium' },
  'Analytics':             { title: 'Analytics & Reporting',      description: 'In-app analytics charts, export reports (CSV/PDF), and optional Google Analytics integration.', priority: 'Low' },
  'API Integration':       { title: 'Third-party API Integration', description: 'Connect external APIs (CRM, ERP, shipping, social, etc.) with rate limiting and error handling.', priority: 'Medium' },
  'SEO Setup':             { title: 'SEO Optimisation',           description: 'Meta tags, Open Graph, sitemap.xml, robots.txt, structured data, and Core Web Vitals optimisation.', priority: 'Low' },
};

const PHASE_MAP: Record<string, { phase: number; name: string; duration: string; deliverables: string[] }[]> = {
  'Landing Page':         [
    { phase: 1, name: 'Design & Content', duration: '3–5 days',  deliverables: ['Wireframes', 'Copywriting', 'Design mockups'] },
    { phase: 2, name: 'Development',      duration: '4–7 days',  deliverables: ['Responsive build', 'Animations', 'CMS integration'] },
    { phase: 3, name: 'Launch',           duration: '1–2 days',  deliverables: ['Domain setup', 'SSL', 'Speed optimisation', 'Go-live'] },
  ],
  'SaaS MVP':             [
    { phase: 1, name: 'Discovery & Architecture', duration: '1 week',   deliverables: ['SRS document', 'DB schema', 'API contracts', 'UI wireframes'] },
    { phase: 2, name: 'Core Backend',             duration: '2 weeks',  deliverables: ['Auth system', 'Core APIs', 'Database setup', 'CI pipeline'] },
    { phase: 3, name: 'Frontend',                 duration: '2 weeks',  deliverables: ['Dashboard UI', 'Feature screens', 'Component library'] },
    { phase: 4, name: 'Integrations & Testing',   duration: '1 week',   deliverables: ['Payments', 'Emails', 'Unit tests', 'QA'] },
    { phase: 5, name: 'Launch',                   duration: '3–4 days', deliverables: ['Cloud deployment', 'Monitoring', 'Admin handover'] },
  ],
};

function getPhases(projectType: string, timeline: string): { phase: number; name: string; duration: string; deliverables: string[] }[] {
  const preset = PHASE_MAP[projectType];
  if (preset) return preset;

  const isUrgent = timeline.startsWith('Urgent');
  return [
    { phase: 1, name: 'Discovery & Design',   duration: isUrgent ? '2–3 days' : '1 week',    deliverables: ['Requirements finalization', 'Wireframes', 'DB design'] },
    { phase: 2, name: 'Core Development',     duration: isUrgent ? '1–1.5 weeks' : '2 weeks', deliverables: ['Core features', 'API development', 'Database setup'] },
    { phase: 3, name: 'UI & Integrations',    duration: isUrgent ? '4–5 days' : '1 week',     deliverables: ['Frontend polish', 'Third-party integrations', 'QA'] },
    { phase: 4, name: 'Deployment & Handover',duration: isUrgent ? '1–2 days' : '3–4 days',   deliverables: ['Production deploy', 'Documentation', 'Team training'] },
  ];
}

export function generateSRS(input: CreateLeadInput, minPrice: number, maxPrice: number): SRSDocument {
  const techDescription = input.description.match(/\[Tech: ([^\]]+)\]/)?.[1] ?? 'Not specified';
  const cleanDesc = input.description.replace(/\[Tech:[^\]]+\]\n?/, '').replace(/\[Other feature:[^\]]+\]\n?/, '').trim();

  const techStack = TECH_MAP[techDescription] ?? TECH_MAP['No Preference'];

  const featureReqs = (input.features ?? [])
    .filter(f => FEATURE_REQUIREMENTS[f])
    .map((f, i) => ({ id: `FR-${String(i + 1).padStart(2, '0')}`, ...FEATURE_REQUIREMENTS[f] }));

  const nonFunctional = [
    { category: 'Performance',  requirement: 'Pages must load within 2.5 s on a standard connection (LCP < 2.5 s)' },
    { category: 'Security',     requirement: 'All data in transit encrypted with TLS 1.2+; passwords hashed with bcrypt' },
    { category: 'Scalability',  requirement: 'Architecture should support 10× current load without a rewrite' },
    { category: 'Accessibility',requirement: 'WCAG 2.1 Level AA compliance for all public-facing pages' },
    { category: 'Uptime',       requirement: '99.5% monthly uptime SLA with automated health monitoring' },
  ];

  const deliverables = [
    'Production-ready codebase (GitHub / GitLab private repo)',
    'Complete deployment to your chosen hosting provider',
    'Admin panel or CMS for content management',
    'Technical documentation and README',
    '30-day post-launch support window',
    ...(input.features?.includes('SEO Setup') ? ['SEO audit report and sitemap submission'] : []),
    ...(input.features?.includes('Analytics') ? ['Analytics dashboard and reporting setup'] : []),
  ];

  const assumptions = [
    'Client will provide branding assets (logo, brand colours, fonts) within 3 business days of project start',
    'Content (text, images, product data) will be provided by the client unless copywriting is included',
    'Feedback cycles will be completed within 2 business days to maintain the timeline',
    'Third-party API credentials (payment gateway keys, SMTP credentials, etc.) will be shared before integration phase',
    'Hosting accounts (Vercel, Railway, etc.) will be created or transferred as agreed',
  ];

  return {
    title: `Software Requirements Specification — ${input.projectType}`,
    version: '1.0',
    generatedAt: new Date().toISOString(),
    client: { name: input.fullName, email: input.email, phone: input.phone },
    overview: cleanDesc || `This document defines the requirements for a ${input.projectType} project. The system will be built using ${techStack.frontend} for the frontend and ${techStack.backend} for the backend.`,
    scope: {
      included: [
        `${input.projectType} build with responsive design`,
        ...(featureReqs.map(f => f.title)),
        'Deployment to production hosting',
        '30-day post-launch support',
      ],
      outOfScope: [
        'Ongoing maintenance beyond 30 days (available as a separate retainer)',
        'Content creation (unless explicitly agreed)',
        'Third-party licence fees (domain, hosting, payment gateway fees)',
      ],
    },
    functionalRequirements: featureReqs.length > 0 ? featureReqs : [
      { id: 'FR-01', title: 'Core Application Build', description: `Build the core ${input.projectType} with clean, maintainable code following best practices.`, priority: 'High' },
    ],
    nonFunctionalRequirements: nonFunctional,
    techStack,
    phases: getPhases(input.projectType, input.timeline),
    deliverables,
    assumptions,
  };
}

export function generateMarketComparison(input: CreateLeadInput, minPrice: number, maxPrice: number): MarketComparison {
  const fmt = (n: number) => `₹${(n / 1000).toFixed(0)}K`;

  return {
    summary: `Market analysis for a ${input.projectType} in the Indian market (2025–2026).`,
    competitors: [
      {
        name: 'Freelancer (Upwork / Fiverr)',
        priceRange: `${fmt(Math.round(minPrice * 0.5))} – ${fmt(Math.round(minPrice * 0.85))}`,
        timeline: 'Variable (often delayed)',
        highlights: ['Lower upfront cost', 'Flexible availability'],
        gaps: [
          'No formal requirements process — scope creep is common',
          'Limited accountability and post-delivery support',
          'Code quality varies widely with no review process',
          'Difficult to handover or scale the codebase later',
        ],
      },
      {
        name: 'Large IT Agency',
        priceRange: `${fmt(Math.round(maxPrice * 1.1))} – ${fmt(Math.round(maxPrice * 2.0))}`,
        timeline: '2–3× longer due to overhead',
        highlights: ['Brand credibility', 'Large team'],
        gaps: [
          'Premium pricing includes heavy overhead and sales commissions',
          'Your project gets assigned to a junior team after signing',
          'Slow communication and long revision cycles',
          'Generic solutions not tailored to your product vision',
        ],
      },
    ],
    codeebe: {
      priceRange: `${fmt(minPrice)} – ${fmt(maxPrice)}`,
      timeline: input.timeline,
      highlights: [
        'Full requirement clarity workshop before any code is written',
        'Scalable, maintainable architecture from day one',
        'Direct access to senior engineers throughout the project',
        'Modern tech stack (Next.js, NestJS, PostgreSQL, Vercel)',
        '30-day post-launch support included',
        'Transparent pricing — no hidden costs',
        'Admin handover with documentation',
      ],
    },
    whyCodeebe: [
      'We treat your project like a product, not a task — outcome-focused delivery',
      'You get a dedicated team, not a project manager relaying messages',
      'Clean codebase you can scale and hand to any developer later',
      'We include what others charge extra for: SRS, architecture, deployment, support',
    ],
  };
}
