import type { IndustryConfig } from "./types";

export const gymConfig: IndustryConfig = {
  slug: "gym",
  navLabel: "Gym",
  navIcon: "fitness_center",
  theme: {
    key: "gym",
    dark: true,
    bg: "#070707",
    surface: "rgba(17,17,17,0.95)",
    surfaceHi: "linear-gradient(180deg, #161616, #0a0a0a)",
    primary: "#A6FF00",
    secondary: "#D2FF66",
    text: "#FFFFFF",
    subtext: "#9DA79B",
    border: "rgba(255,255,255,0.08)",
    borderHi: "rgba(255,255,255,0.14)",
    success: "#22C55E",
    overlay: "rgba(255,255,255,0.02)",
    overlayHi: "rgba(255,255,255,0.06)",
    onPrimary: "#0a0a0a",
    glow: "rgba(166,255,0,0.20)",
    softTint: "rgba(166,255,0,0.10)",
    motif: "pulse",
  },
  meta: {
    title: "Gym Website Development — Codeebe | Membership & Fitness Platforms",
    description:
      "Codeebe builds high-energy gym & fitness platforms with membership portals, trainer logins, workout & nutrition plans, QR attendance, online classes and payments. Get an instant AI cost estimate.",
  },

  hero: {
    badge: "Modern Fitness Platform Development",
    badgeIcon: "bolt",
    titleLead: "Grow your gym with a",
    titleHighlight: "powerful digital platform",
    subtitle:
      "Turn walk-ins into members and members into fans. We build fitness platforms with membership management, trainer scheduling, workout & nutrition programs, QR check-in, online classes and automated renewals.",
    primaryCta: "Get Instant AI Estimate",
    secondaryCta: "See Live Demo",
    trustPills: [
      { icon: "groups", label: "50k+ members managed" },
      { icon: "bolt", label: "Real-time attendance" },
      { icon: "verified", label: "Secure payments" },
    ],
  },

  dashboard: {
    title: "Gym Control",
    titleIcon: "monitoring",
    kpis: [
      { label: "Active Members", value: "1,248", icon: "groups", tint: "primary" },
      { label: "Revenue (MTD)", value: "₹9.4L", icon: "payments", tint: "secondary" },
      { label: "Check-ins Today", value: "312", icon: "how_to_reg", tint: "success" },
    ],
    chartTitle: "Weekly attendance",
    chartCaption: "Last 7 days",
    bars: [48, 62, 55, 78, 70, 92, 84],
    listTitle: "Membership renewals",
    listRows: [
      { name: "Monthly", pct: 72 },
      { name: "Quarterly", pct: 58 },
      { name: "Annual", pct: 88 },
    ],
    floatA: { icon: "trending_up", label: "Retention", value: "+28.6%" },
    floatB: { icon: "auto_awesome", label: "AI Nudge", value: "12 at-risk members" },
  },

  trustedBy: ["IronPeak", "PulseFit", "TITAN Gym", "FlexZone", "CoreLab", "BeastMode", "ZenFit"],

  problems: [
    { pain: "Members quietly cancel and you find out too late", painIcon: "person_off", fix: "Automated renewal reminders, at-risk detection and win-back campaigns keep retention high — the platform flags members before they churn.", fixIcon: "notifications_active" },
    { pain: "Registers, spreadsheets and WhatsApp everywhere", painIcon: "grid_off", fix: "One connected system for members, payments, attendance and trainers — no more scattered data or manual reconciliation.", fixIcon: "hub" },
    { pain: "Front-desk queues at peak hours", painIcon: "hourglass_empty", fix: "QR / biometric check-in lets members scan and go, while staff get a live attendance board.", fixIcon: "qr_code_2" },
    { pain: "No way to sell online classes or plans", painIcon: "sell", fix: "Sell memberships, PT sessions, online classes and nutrition plans directly on your site with instant online payments.", fixIcon: "shopping_cart_checkout" },
    { pain: "Trainers double-booked and schedules clash", painIcon: "event_busy", fix: "Smart trainer scheduling with availability, class capacity and automatic conflict prevention.", fixIcon: "calendar_month" },
  ],

  features: [
    { title: "Membership Plans", desc: "Flexible tiers, add-ons, freezes and auto-renewals with prorated billing.", icon: "card_membership", span: 2, highlight: true },
    { title: "Trainer Profiles", desc: "Bios, specialties, ratings and bookable availability for every trainer.", icon: "sports_gymnastics" },
    { title: "Online Classes", desc: "Live and on-demand streaming with capacity control and waitlists.", icon: "live_tv" },
    { title: "Workout Programs", desc: "Assign structured routines with sets, reps and progress tracking.", icon: "fitness_center" },
    { title: "Nutrition Plans", desc: "Custom meal plans and macros tied to each member's goals.", icon: "restaurant" },
    { title: "QR Check-in", desc: "Contactless attendance with a live front-desk board.", icon: "qr_code_2" },
    { title: "Attendance Analytics", desc: "Peak-hour heatmaps and per-member visit streaks.", icon: "insights" },
    { title: "Fitness Challenges", desc: "Leaderboards, badges and community challenges that drive engagement.", icon: "emoji_events" },
  ],

  showcase: {
    heading: "One platform, every screen",
    subtitle: "From the member-facing site to the front-desk command center — explore what your gym will run on.",
  },

  estimator: {
    industryLabel: "Gym & Fitness Platform",
    platformBaseline: 70000,
    budgetOptions: ["Under ₹2L", "₹2L – ₹4L", "₹4L – ₹8L", "₹8L – ₹15L", "₹15L+"],
    steps: [
      {
        id: "members", kind: "scale", eyebrow: "Step 01", title: "How many members do you manage?", subtitle: "This sets the scale of your membership infrastructure.", type: "single", min: 1,
        options: [
          { id: "mem-s", label: "Up to 200", desc: "Boutique studio", icon: "person", cost: 40000 },
          { id: "mem-m", label: "200 – 800", desc: "Growing gym", icon: "groups", cost: 80000 },
          { id: "mem-l", label: "800 – 2,000", desc: "Established chain", icon: "diversity_3", cost: 130000 },
          { id: "mem-xl", label: "2,000+", desc: "Multi-branch enterprise", icon: "apartment", cost: 190000 },
        ],
      },
      {
        id: "trainers", kind: "scale", eyebrow: "Step 02", title: "How many trainers on staff?", subtitle: "Drives scheduling and trainer-portal complexity.", type: "single", min: 1,
        options: [
          { id: "tr-s", label: "1 – 3 trainers", icon: "sports", cost: 15000 },
          { id: "tr-m", label: "4 – 10 trainers", icon: "sports_gymnastics", cost: 30000 },
          { id: "tr-l", label: "10+ trainers", icon: "groups_3", cost: 55000 },
        ],
      },
      {
        id: "member-x", kind: "feature", eyebrow: "Step 03", title: "Member experience", subtitle: "What members can do online.", type: "multi",
        options: [
          { id: "member-portal", label: "Membership Portal", icon: "account_circle", cost: 45000 },
          { id: "trainer-login", label: "Trainer Login", icon: "badge", cost: 35000 },
          { id: "workout-plans", label: "Workout Plans", icon: "fitness_center", cost: 50000, suggest: true, tip: "Assignable workout plans boost member results and retention." },
          { id: "nutrition", label: "Nutrition Module", icon: "restaurant", cost: 45000, suggest: true, tip: "A nutrition module is a high-margin upsell members love." },
          { id: "online-classes", label: "Online Classes", icon: "live_tv", cost: 70000 },
          { id: "challenges", label: "Fitness Challenges", icon: "emoji_events", cost: 30000 },
        ],
      },
      {
        id: "ops", kind: "feature", eyebrow: "Step 04", title: "Operations & payments", subtitle: "How your gym runs day to day.", type: "multi",
        options: [
          { id: "qr", label: "QR Attendance", icon: "qr_code_2", cost: 40000, suggest: true, tip: "QR/biometric attendance removes front-desk queues at peak hours." },
          { id: "payment", label: "Payment Gateway", icon: "credit_card", cost: 40000, suggest: true, tip: "Online payments cut collection effort and improve on-time renewals." },
          { id: "renewals", label: "Auto Renewals & Reminders", icon: "autorenew", cost: 35000 },
          { id: "scheduling", label: "Class & Trainer Scheduling", icon: "calendar_month", cost: 45000 },
          { id: "store", label: "Supplement Store / POS", icon: "storefront", cost: 55000 },
          { id: "analytics", label: "Analytics Dashboard", icon: "insights", cost: 50000 },
        ],
      },
      {
        id: "growth", kind: "feature", eyebrow: "Step 05", title: "Apps & growth", subtitle: "Reach members on every device.", type: "multi",
        options: [
          { id: "android", label: "Android App", icon: "android", cost: 140000 },
          { id: "ios", label: "iOS App", icon: "phone_iphone", cost: 150000, suggest: true, tip: "A branded mobile app dramatically lifts check-in frequency and retention." },
          { id: "whatsapp", label: "WhatsApp Reminders", icon: "chat", cost: 40000 },
          { id: "email-auto", label: "Email Automation", icon: "forward_to_inbox", cost: 35000 },
          { id: "crm", label: "Lead CRM", icon: "contacts", cost: 55000 },
          { id: "multi-branch", label: "Multi-Branch Support", icon: "store", cost: 75000 },
        ],
      },
      {
        id: "timeline", kind: "timeline", eyebrow: "Step 06", title: "How soon do you need to launch?", subtitle: "Faster launches need a larger dedicated team.", type: "single", min: 1,
        options: [
          { id: "tl-flex", label: "Flexible (3 – 4 months)", desc: "Best value", icon: "spa", cost: 0, multiplier: 1.0 },
          { id: "tl-std", label: "Standard (6 – 10 weeks)", desc: "Balanced", icon: "schedule", cost: 0, multiplier: 1.08 },
          { id: "tl-rush", label: "Rush (3 – 5 weeks)", desc: "Priority team", icon: "bolt", cost: 0, multiplier: 1.2 },
        ],
      },
    ],
  },

  packages: [
    { name: "Starter", price: "₹35,000", period: "one-time", tagline: "Launch a stunning gym site fast.", cta: "Start with Starter", features: ["5-page premium website", "Membership plan showcase", "Class timetable", "Lead capture forms", "WhatsApp click-to-chat", "Mobile-first & SEO ready"] },
    { name: "Professional", price: "₹1,20,000", period: "one-time", popular: true, tagline: "The all-in-one member platform.", cta: "Get Professional", features: ["Everything in Starter", "Member portal + login", "Online payments & renewals", "QR attendance system", "Trainer scheduling", "Workout & nutrition plans", "Admin dashboard & analytics"] },
    { name: "Enterprise", price: "₹3,00,000+", period: "custom", tagline: "For multi-branch chains & apps.", cta: "Talk to Sales", features: ["Everything in Professional", "Android + iOS mobile app", "Multi-branch management", "Advanced CRM & automation", "Custom integrations", "Priority SLA support"] },
  ],

  stats: [
    { value: "120+", label: "Platforms shipped", icon: "rocket_launch" },
    { value: "28%", label: "Avg. retention lift", icon: "trending_up" },
    { value: "50000+", label: "Members managed", icon: "groups" },
    { value: "4.9", label: "Client rating", icon: "star" },
  ],

  testimonials: [
    { quote: "Renewals used to slip through the cracks. Now the platform reminds members automatically and our retention jumped in the first quarter.", name: "Rohit Malhotra", role: "Owner, IronPeak Fitness", metric: "+31%", metricLabel: "retention" },
    { quote: "QR check-in ended our front-desk chaos. Members scan and walk in, and I can see live attendance from my phone.", name: "Sneha Kapoor", role: "Founder, PulseFit Studio", metric: "0", metricLabel: "queue time" },
    { quote: "Selling online classes and nutrition plans added a whole new revenue stream we didn't have before.", name: "Arjun Verma", role: "Director, TITAN Gym", metric: "₹2.1L", metricLabel: "new monthly rev" },
  ],

  faqs: [
    { q: "Can members pay and renew online?", a: "Yes. We integrate secure payment gateways with auto-renewals, invoices and reminders, so collections happen without manual chasing." },
    { q: "Do you build the mobile app too?", a: "Absolutely. The Enterprise package includes native Android and iOS apps for members, with check-in, plans and class booking." },
    { q: "Can I manage multiple branches?", a: "Yes — multi-branch support gives each location its own dashboard while you get a consolidated owner view." },
    { q: "How long does it take to launch?", a: "A Starter site launches in 2–3 weeks. A full member platform typically takes 6–10 weeks depending on scope." },
    { q: "Will it work with my existing member data?", a: "We migrate your existing members, plans and payment history so you start with everything already in place." },
  ],

  contact: {
    heading: "Book your free consultation",
    subtitle: "Tell us about your gym. We'll respond within 24 hours with a tailored plan, timeline and quote — no obligation.",
    businessTypes: ["Single Gym", "Fitness Studio", "CrossFit Box", "Yoga / Pilates", "Multi-Branch Chain", "Personal Trainer"],
    perks: [
      { icon: "schedule", title: "24-hour response", desc: "Real humans, fast replies." },
      { icon: "handshake", title: "No-pressure consultation", desc: "Advice first, always." },
      { icon: "lock", title: "Your details stay private", desc: "We never share your data." },
    ],
  },

  subNav: [
    { label: "Features", href: "#features" },
    { label: "Product", href: "#showcase" },
    { label: "Pricing", href: "#pricing" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
};
