import type { IndustryConfig } from "./types";

export const eventConfig: IndustryConfig = {
  slug: "event-management",
  navLabel: "Event Management",
  navIcon: "celebration",
  theme: {
    key: "event",
    dark: true,
    bg: "#0A0710",
    surface: "rgba(21,15,31,0.96)",
    surfaceHi: "linear-gradient(180deg, #1a1226, #0c0812)",
    primary: "#A855F7",
    secondary: "#FF8A00",
    text: "#FFFFFF",
    subtext: "#B3A8C9",
    border: "rgba(255,255,255,0.09)",
    borderHi: "rgba(255,255,255,0.16)",
    success: "#22C55E",
    overlay: "rgba(255,255,255,0.03)",
    overlayHi: "rgba(255,255,255,0.07)",
    onPrimary: "#FFFFFF",
    glow: "rgba(168,85,247,0.22)",
    softTint: "rgba(168,85,247,0.12)",
    motif: "confetti",
  },
  meta: {
    title: "Event Management Website Development — Codeebe | Booking & Ticketing Platforms",
    description:
      "Codeebe builds stunning event management platforms with event & venue booking, ticketing, vendor management, client dashboards, guest management and email automation. Get an instant AI cost estimate.",
  },

  hero: {
    badge: "Luxury Event Platform Development",
    badgeIcon: "celebration",
    titleLead: "Create stunning event experiences with a",
    titleHighlight: "premium event platform",
    subtitle:
      "From weddings to corporate galas, we build cinematic event platforms with online booking, ticketing, vendor and venue management, client dashboards, guest lists and email automation — all in your brand.",
    primaryCta: "Get Instant AI Estimate",
    secondaryCta: "See Live Demo",
    trustPills: [
      { icon: "confirmation_number", label: "Instant ticketing" },
      { icon: "diversity_3", label: "Vendor management" },
      { icon: "auto_awesome", label: "Show-stopping design" },
    ],
  },

  dashboard: {
    title: "Event Command",
    titleIcon: "dashboard",
    kpis: [
      { label: "Upcoming Events", value: "24", icon: "event", tint: "primary" },
      { label: "Revenue (MTD)", value: "₹18.6L", icon: "payments", tint: "secondary" },
      { label: "Tickets Sold", value: "3,942", icon: "confirmation_number", tint: "success" },
    ],
    chartTitle: "Bookings this month",
    chartCaption: "Last 7 weeks",
    bars: [50, 66, 58, 82, 72, 94, 80],
    listTitle: "Event pipeline",
    listRows: [
      { name: "Weddings", pct: 84 },
      { name: "Corporate", pct: 62 },
      { name: "Concerts", pct: 71 },
    ],
    floatA: { icon: "trending_up", label: "Conversion", value: "+41%" },
    floatB: { icon: "auto_awesome", label: "AI Planner", value: "3 vendor matches" },
  },

  trustedBy: ["Grand Affairs", "Lumière Events", "Stellar Weddings", "Vertex Live", "Aurora Galas", "Momentum", "Celebra"],

  problems: [
    { pain: "Enquiries lost across calls, DMs and email", painIcon: "forum", fix: "A single booking pipeline captures every enquiry with automated follow-ups, so no lead ever slips away.", fixIcon: "hub" },
    { pain: "Ticket sales handled manually", painIcon: "confirmation_number", fix: "Sell tickets online with QR entry, tiered pricing and real-time capacity — no more spreadsheets at the door.", fixIcon: "qr_code_2" },
    { pain: "Vendor coordination is chaos", painIcon: "diversity_3", fix: "A vendor portal keeps caterers, decorators and performers, tasks and payments organised in one place.", fixIcon: "groups" },
    { pain: "Clients keep asking for updates", painIcon: "sms", fix: "A client dashboard shows timelines, payments and approvals live — plus automated email updates at every milestone.", fixIcon: "space_dashboard" },
    { pain: "Guest lists and RSVPs are a mess", painIcon: "list_alt", fix: "Digital invites, RSVP tracking and seating in one guest management module keep every event organised.", fixIcon: "how_to_reg" },
  ],

  features: [
    { title: "Event Booking", desc: "Capture enquiries and confirm bookings with online deposits.", icon: "event_available", span: 2, highlight: true },
    { title: "Wedding Packages", desc: "Beautiful curated packages with add-ons and instant quotes.", icon: "favorite" },
    { title: "Corporate Events", desc: "Conferences, launches and galas with delegate handling.", icon: "corporate_fare" },
    { title: "Vendor Management", desc: "Onboard vendors, assign tasks and track payments.", icon: "diversity_3" },
    { title: "Venue Booking", desc: "Showcase venues with availability and instant reservations.", icon: "location_city" },
    { title: "Gallery", desc: "Cinematic portfolios of past events that sell your work.", icon: "photo_library" },
    { title: "Ticket Booking", desc: "Online ticketing with QR entry and tiered pricing.", icon: "confirmation_number" },
    { title: "Guest Management", desc: "Digital invites, RSVPs and seating in one place.", icon: "groups" },
  ],

  showcase: {
    heading: "One platform, every screen",
    subtitle: "From the show-stopping client-facing site to the event command center — explore the experience your clients and guests will love.",
  },

  estimator: {
    industryLabel: "Event Management Platform",
    platformBaseline: 75000,
    budgetOptions: ["Under ₹2L", "₹2L – ₹5L", "₹5L – ₹10L", "₹10L – ₹20L", "₹20L+"],
    steps: [
      {
        id: "volume", kind: "scale", eyebrow: "Step 01", title: "How many events do you run monthly?", subtitle: "This sets the scale of your booking and ticketing infrastructure.", type: "single", min: 1,
        options: [
          { id: "ev-s", label: "1 – 5 events", desc: "Boutique planner", icon: "event", cost: 40000 },
          { id: "ev-m", label: "5 – 20 events", desc: "Active agency", icon: "calendar_month", cost: 80000 },
          { id: "ev-l", label: "20 – 50 events", desc: "Large agency", icon: "date_range", cost: 130000 },
          { id: "ev-xl", label: "50+ events", desc: "Enterprise / venue", icon: "stadium", cost: 190000 },
        ],
      },
      {
        id: "booking", kind: "feature", eyebrow: "Step 02", title: "Booking & ticketing", subtitle: "How clients and guests reserve.", type: "multi",
        options: [
          { id: "ticket", label: "Ticket Booking", icon: "confirmation_number", cost: 70000, suggest: true, tip: "Online ticketing with QR entry replaces manual door management entirely." },
          { id: "qr-tickets", label: "QR Tickets & Check-in", icon: "qr_code_2", cost: 40000 },
          { id: "payments", label: "Online Payments", icon: "credit_card", cost: 40000, suggest: true, tip: "Online deposits confirm bookings instantly and improve cash flow." },
          { id: "calendar", label: "Event Calendar", icon: "calendar_month", cost: 35000 },
          { id: "venue", label: "Venue Booking", icon: "location_city", cost: 55000 },
        ],
      },
      {
        id: "manage", kind: "feature", eyebrow: "Step 03", title: "Management portals", subtitle: "Keep clients and vendors in sync.", type: "multi",
        options: [
          { id: "vendor-portal", label: "Vendor Portal", icon: "diversity_3", cost: 70000, suggest: true, tip: "A vendor portal ends the coordination chaos across caterers, decor and performers." },
          { id: "client-dashboard", label: "Client Dashboard", icon: "space_dashboard", cost: 60000, suggest: true, tip: "A client dashboard cuts status-update calls and looks incredibly premium." },
          { id: "guest", label: "Guest Management", icon: "groups", cost: 45000 },
          { id: "gallery", label: "Gallery / Portfolio", icon: "photo_library", cost: 25000 },
          { id: "packages", label: "Package Builder", icon: "inventory_2", cost: 40000 },
        ],
      },
      {
        id: "growth", kind: "feature", eyebrow: "Step 04", title: "Automation & reach", subtitle: "Grow and stay connected.", type: "multi",
        options: [
          { id: "email-auto", label: "Email Automation", icon: "forward_to_inbox", cost: 40000, suggest: true, tip: "Automated milestone emails keep clients delighted with zero manual effort." },
          { id: "whatsapp", label: "WhatsApp Integration", icon: "chat", cost: 45000 },
          { id: "android", label: "Android App", icon: "android", cost: 140000 },
          { id: "ios", label: "iOS App", icon: "phone_iphone", cost: 150000 },
          { id: "analytics", label: "Analytics Dashboard", icon: "insights", cost: 50000 },
          { id: "crm", label: "Lead CRM", icon: "contacts", cost: 55000 },
        ],
      },
      {
        id: "timeline", kind: "timeline", eyebrow: "Step 05", title: "How soon do you need to launch?", subtitle: "Faster launches need a larger dedicated team.", type: "single", min: 1,
        options: [
          { id: "tl-flex", label: "Flexible (3 – 5 months)", desc: "Best value", icon: "spa", cost: 0, multiplier: 1.0 },
          { id: "tl-std", label: "Standard (2 – 3 months)", desc: "Balanced", icon: "schedule", cost: 0, multiplier: 1.08 },
          { id: "tl-rush", label: "Rush (4 – 8 weeks)", desc: "Priority team", icon: "bolt", cost: 0, multiplier: 1.2 },
        ],
      },
    ],
  },

  packages: [
    { name: "Starter", price: "₹38,000", period: "one-time", tagline: "A cinematic event website.", cta: "Start with Starter", features: ["Premium multi-page website", "Services & packages showcase", "Portfolio gallery", "Enquiry & booking forms", "WhatsApp click-to-chat", "SEO & mobile optimized"] },
    { name: "Professional", price: "₹1,40,000", period: "one-time", popular: true, tagline: "The complete event platform.", cta: "Get Professional", features: ["Everything in Starter", "Online booking + deposits", "Ticketing with QR entry", "Client dashboard", "Guest & RSVP management", "Email automation", "Admin dashboard & analytics"] },
    { name: "Enterprise", price: "₹3,80,000+", period: "custom", tagline: "For venues, agencies & apps.", cta: "Talk to Sales", features: ["Everything in Professional", "Vendor management portal", "Venue booking system", "Android + iOS apps", "Advanced CRM & automation", "Multi-brand / white-label"] },
  ],

  stats: [
    { value: "100+", label: "Platforms launched", icon: "celebration" },
    { value: "41%", label: "Higher conversion", icon: "trending_up" },
    { value: "500000+", label: "Tickets sold", icon: "confirmation_number" },
    { value: "4.9", label: "Client rating", icon: "star" },
  ],

  testimonials: [
    { quote: "Our enquiries used to scatter everywhere. Now every lead lands in one pipeline with automatic follow-ups — we close far more events.", name: "Isha Menon", role: "Founder, Grand Affairs", metric: "+41%", metricLabel: "close rate" },
    { quote: "Online ticketing with QR entry made our concerts run like clockwork. No more spreadsheets or chaos at the door.", name: "Karan Bhatia", role: "Director, Vertex Live", metric: "3,900+", metricLabel: "tickets/event" },
    { quote: "The client dashboard is a showstopper. Couples can see their timeline and payments live — it makes us look so premium.", name: "Priya Nair", role: "Owner, Stellar Weddings", metric: "-60%", metricLabel: "status calls" },
  ],

  faqs: [
    { q: "Can I sell event tickets online?", a: "Yes. We build online ticketing with tiered pricing, real-time capacity and QR-code entry so check-in at the door is instant." },
    { q: "Does it handle vendors and venues?", a: "Absolutely. A vendor portal organises caterers, decorators and performers with tasks and payments, and venue booking shows live availability." },
    { q: "Can clients track their event online?", a: "Yes — a branded client dashboard shows timelines, approvals and payments live, with automated email updates at every milestone." },
    { q: "Do you handle weddings and corporate events?", a: "Both. The platform supports wedding packages, corporate conferences, concerts and ticketed public events with tailored flows for each." },
    { q: "How long does it take to launch?", a: "An event website launches in 2–3 weeks. A full booking, ticketing and vendor platform typically takes 8–12 weeks depending on scope." },
  ],

  contact: {
    heading: "Book your free consultation",
    subtitle: "Tell us about your events business. We'll respond within 24 hours with a tailored plan, timeline and quote — no obligation.",
    businessTypes: ["Wedding Planner", "Corporate Events", "Event Venue", "Concert / Ticketing", "Full-Service Agency", "Individual Planner"],
    perks: [
      { icon: "schedule", title: "24-hour response", desc: "Real humans, fast replies." },
      { icon: "auto_awesome", title: "Show-stopping design", desc: "A site as memorable as your events." },
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
