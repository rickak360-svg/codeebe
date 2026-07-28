import type { IndustryConfig } from "./types";

export const barberConfig: IndustryConfig = {
  slug: "barber",
  navLabel: "Barber Shop",
  navIcon: "content_cut",
  theme: {
    key: "barber",
    dark: true,
    bg: "#0B0906",
    surface: "rgba(23,18,12,0.96)",
    surfaceHi: "linear-gradient(180deg, #1c150d, #0d0a06)",
    primary: "#D4AF37",
    secondary: "#EAC77A",
    text: "#F5EFE3",
    subtext: "#B0A188",
    border: "rgba(212,175,55,0.14)",
    borderHi: "rgba(212,175,55,0.26)",
    success: "#22C55E",
    overlay: "rgba(255,255,255,0.02)",
    overlayHi: "rgba(255,255,255,0.06)",
    onPrimary: "#1a1206",
    glow: "rgba(212,175,55,0.20)",
    softTint: "rgba(212,175,55,0.10)",
    motif: "shimmer",
  },
  meta: {
    title: "Barber Shop Website Development — Codeebe | Booking & Grooming Platforms",
    description:
      "Codeebe builds luxury barber shop platforms with online appointment booking, barber selection, memberships, galleries, product sales and loyalty rewards. Get an instant AI cost estimate.",
  },

  hero: {
    badge: "Luxury Grooming Platform Development",
    badgeIcon: "diamond",
    titleLead: "Premium websites for",
    titleHighlight: "modern barber shops",
    subtitle:
      "Look as sharp online as your cuts. We craft luxury grooming platforms with online booking, barber selection, memberships, galleries, product sales and loyalty rewards that keep chairs full.",
    primaryCta: "Get Instant AI Estimate",
    secondaryCta: "See Live Demo",
    trustPills: [
      { icon: "event_available", label: "Zero-friction booking" },
      { icon: "loyalty", label: "Loyalty that retains" },
      { icon: "diamond", label: "Luxury brand feel" },
    ],
  },

  dashboard: {
    title: "Chair Control",
    titleIcon: "storefront",
    kpis: [
      { label: "Appointments Today", value: "48", icon: "event", tint: "primary" },
      { label: "Revenue (MTD)", value: "₹6.2L", icon: "payments", tint: "secondary" },
      { label: "Chair Utilization", value: "91%", icon: "chair", tint: "success" },
    ],
    chartTitle: "Weekly bookings",
    chartCaption: "Last 7 days",
    bars: [44, 58, 52, 70, 64, 96, 88],
    listTitle: "Top barbers",
    listRows: [
      { name: "Marcus", pct: 92 },
      { name: "Dev", pct: 78 },
      { name: "Sam", pct: 66 },
    ],
    floatA: { icon: "loyalty", label: "Repeat clients", value: "+37%" },
    floatB: { icon: "auto_awesome", label: "AI Slot Fill", value: "5 gaps filled" },
  },

  trustedBy: ["The Gentlemen's Cut", "FadeLab", "Blade & Co.", "Royal Grooming", "SharpHouse", "Kingsman", "Barbería"],

  problems: [
    { pain: "No-shows leave chairs empty", painIcon: "event_busy", fix: "Deposits at booking plus automatic WhatsApp reminders keep chairs full and protect your barbers' time.", fixIcon: "notifications_active" },
    { pain: "Clients can't book their favourite barber", painIcon: "person_search", fix: "Let clients pick their preferred barber, service and slot in seconds — availability updates in real time.", fixIcon: "how_to_reg" },
    { pain: "Walk-ins pile up while slots sit empty", painIcon: "groups", fix: "Smart scheduling balances walk-ins and bookings, and AI fills last-minute gaps automatically.", fixIcon: "insights" },
    { pain: "One-time clients never come back", painIcon: "sentiment_dissatisfied", fix: "Memberships and loyalty rewards turn first cuts into lifelong regulars with points, tiers and perks.", fixIcon: "loyalty" },
    { pain: "Products sit on the shelf", painIcon: "inventory_2", fix: "Sell grooming products online and at checkout with an integrated store and inventory.", fixIcon: "storefront" },
  ],

  features: [
    { title: "Appointment Booking", desc: "Real-time slots by service and barber with deposits.", icon: "event_available", span: 2, highlight: true },
    { title: "Choose Your Barber", desc: "Client-picked barbers with profiles, specialties and ratings.", icon: "how_to_reg" },
    { title: "Membership Plans", desc: "Unlimited-cut and VIP tiers billed automatically.", icon: "card_membership" },
    { title: "Gallery", desc: "Show off your best cuts, fades and shop atmosphere.", icon: "photo_library" },
    { title: "Services & Pricing", desc: "Beautiful, always-current service menu with add-ons.", icon: "menu_book" },
    { title: "Reviews", desc: "Collect and showcase 5-star client reviews automatically.", icon: "reviews" },
    { title: "Product Sales", desc: "Sell pomades, oils and kits online and in-shop.", icon: "storefront" },
    { title: "Loyalty Rewards", desc: "Points, tiers and referrals that bring clients back.", icon: "loyalty" },
  ],

  showcase: {
    heading: "One platform, every screen",
    subtitle: "From the luxury client-facing site to the chair-side booking board — see the premium experience your clients will feel.",
  },

  estimator: {
    industryLabel: "Barber Shop Platform",
    platformBaseline: 55000,
    budgetOptions: ["Under ₹1.5L", "₹1.5L – ₹3L", "₹3L – ₹6L", "₹6L – ₹12L", "₹12L+"],
    steps: [
      {
        id: "barbers", kind: "scale", eyebrow: "Step 01", title: "How many barbers / chairs?", subtitle: "This sets the scale of scheduling and staff logins.", type: "single", min: 1,
        options: [
          { id: "b-s", label: "1 – 2 barbers", desc: "Boutique shop", icon: "person", cost: 25000 },
          { id: "b-m", label: "3 – 6 barbers", desc: "Busy shop", icon: "groups", cost: 45000 },
          { id: "b-l", label: "7 – 15 barbers", desc: "Large studio", icon: "diversity_3", cost: 75000 },
          { id: "b-xl", label: "15+ / multi-outlet", desc: "Chain", icon: "apartment", cost: 120000 },
        ],
      },
      {
        id: "booking", kind: "feature", eyebrow: "Step 02", title: "Booking experience", subtitle: "How clients reserve their chair.", type: "multi",
        options: [
          { id: "appointment", label: "Appointment Booking", icon: "event_available", cost: 45000, suggest: true, tip: "Online booking is the #1 driver of full chairs — clients book any time." },
          { id: "choose-barber", label: "Choose Your Barber", icon: "how_to_reg", cost: 30000 },
          { id: "staff-login", label: "Staff Login", icon: "badge", cost: 30000 },
          { id: "deposits", label: "Booking Deposits", icon: "payments", cost: 30000, suggest: true, tip: "Deposits at booking slash no-shows and protect barber earnings." },
          { id: "reviews", label: "Reviews & Ratings", icon: "reviews", cost: 25000 },
        ],
      },
      {
        id: "retention", kind: "feature", eyebrow: "Step 03", title: "Retention & sales", subtitle: "Turn one-time cuts into regulars.", type: "multi",
        options: [
          { id: "membership", label: "Membership Plans", icon: "card_membership", cost: 45000, suggest: true, tip: "Memberships create predictable monthly revenue and loyal regulars." },
          { id: "loyalty", label: "Loyalty System", icon: "loyalty", cost: 40000, suggest: true, tip: "A loyalty program measurably increases repeat-visit frequency." },
          { id: "store", label: "Product Store", icon: "storefront", cost: 55000 },
          { id: "gallery", label: "Gallery / Portfolio", icon: "photo_library", cost: 20000 },
          { id: "gift", label: "Gift Cards", icon: "redeem", cost: 30000 },
        ],
      },
      {
        id: "growth", kind: "feature", eyebrow: "Step 04", title: "Payments & growth", subtitle: "Get paid and stay top of mind.", type: "multi",
        options: [
          { id: "payment", label: "Online Payment", icon: "credit_card", cost: 35000 },
          { id: "whatsapp", label: "WhatsApp Reminders", icon: "chat", cost: 35000, suggest: true, tip: "WhatsApp reminders keep clients from forgetting their slot." },
          { id: "android", label: "Android App", icon: "android", cost: 130000 },
          { id: "ios", label: "iOS App", icon: "phone_iphone", cost: 140000 },
          { id: "analytics", label: "Analytics Dashboard", icon: "insights", cost: 45000 },
          { id: "multi-branch", label: "Multi-Outlet Support", icon: "store", cost: 70000 },
        ],
      },
      {
        id: "timeline", kind: "timeline", eyebrow: "Step 05", title: "How soon do you need to launch?", subtitle: "Faster launches need a larger dedicated team.", type: "single", min: 1,
        options: [
          { id: "tl-flex", label: "Flexible (2 – 4 months)", desc: "Best value", icon: "spa", cost: 0, multiplier: 1.0 },
          { id: "tl-std", label: "Standard (5 – 8 weeks)", desc: "Balanced", icon: "schedule", cost: 0, multiplier: 1.08 },
          { id: "tl-rush", label: "Rush (3 – 4 weeks)", desc: "Priority team", icon: "bolt", cost: 0, multiplier: 1.2 },
        ],
      },
    ],
  },

  packages: [
    { name: "Starter", price: "₹28,000", period: "one-time", tagline: "A sharp, luxury shop website.", cta: "Start with Starter", features: ["Premium single-page website", "Services & pricing menu", "Gallery / portfolio", "WhatsApp booking button", "Google Maps & reviews", "Mobile-first & fast"] },
    { name: "Professional", price: "₹95,000", period: "one-time", popular: true, tagline: "The full booking & loyalty platform.", cta: "Get Professional", features: ["Everything in Starter", "Online booking + choose barber", "Booking deposits & payments", "Membership & loyalty system", "Staff logins & scheduling", "WhatsApp reminders", "Admin dashboard"] },
    { name: "Enterprise", price: "₹2,20,000+", period: "custom", tagline: "For chains & branded apps.", cta: "Talk to Sales", features: ["Everything in Professional", "Android + iOS mobile app", "Multi-outlet management", "Product store & inventory", "Advanced analytics & CRM", "Priority support"] },
  ],

  stats: [
    { value: "80+", label: "Shops launched", icon: "content_cut" },
    { value: "37%", label: "More repeat clients", icon: "loyalty" },
    { value: "200000+", label: "Bookings taken", icon: "event_available" },
    { value: "4.9", label: "Client rating", icon: "star" },
  ],

  testimonials: [
    { quote: "The booking site made us look like a premium brand overnight. Chairs are full and no-shows basically disappeared with deposits.", name: "Marcus D'Souza", role: "Owner, The Gentlemen's Cut", metric: "-71%", metricLabel: "no-shows" },
    { quote: "Memberships changed everything — we now have predictable monthly income instead of guessing week to week.", name: "Devraj Singh", role: "Founder, FadeLab", metric: "+₹1.8L", metricLabel: "monthly rev" },
    { quote: "Clients love picking their barber and time online. Our regulars come back way more often now.", name: "Sam Rodrigues", role: "Owner, Blade & Co.", metric: "+37%", metricLabel: "repeat visits" },
  ],

  faqs: [
    { q: "Can clients choose their preferred barber?", a: "Yes. Clients pick their barber, service and time slot with real-time availability — a favourite feature for building loyal regulars." },
    { q: "How do you reduce no-shows?", a: "We add booking deposits and automatic WhatsApp/SMS reminders, which together cut no-shows dramatically and protect your barbers' earnings." },
    { q: "Can I run memberships and loyalty rewards?", a: "Absolutely. Offer unlimited-cut memberships, VIP tiers and points-based loyalty that automatically bring clients back." },
    { q: "Can I sell grooming products online?", a: "Yes — an integrated store lets you sell pomades, oils and kits online and at checkout, with inventory tracking." },
    { q: "How long does it take to launch?", a: "A luxury shop site launches in 1–2 weeks. A full booking and loyalty platform typically takes 5–8 weeks." },
  ],

  contact: {
    heading: "Book your free consultation",
    subtitle: "Tell us about your shop. We'll respond within 24 hours with a tailored plan, timeline and quote — no obligation.",
    businessTypes: ["Single Barber Shop", "Grooming Studio", "Salon & Spa", "Multi-Outlet Chain", "Franchise", "Independent Barber"],
    perks: [
      { icon: "schedule", title: "24-hour response", desc: "Real humans, fast replies." },
      { icon: "diamond", title: "Luxury brand design", desc: "A site as sharp as your cuts." },
      { icon: "handshake", title: "No-pressure consultation", desc: "Advice first, always." },
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
