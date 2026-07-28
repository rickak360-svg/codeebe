import type { IndustryConfig } from "./types";

export const clinicConfig: IndustryConfig = {
  slug: "clinic",
  navLabel: "Clinic",
  navIcon: "local_hospital",
  theme: {
    key: "clinic",
    dark: false,
    bg: "#EEF3FB",
    surface: "#FFFFFF",
    surfaceHi: "#FFFFFF",
    primary: "#2563EB",
    secondary: "#4F86FF",
    text: "#0B1B3B",
    subtext: "#5A6B87",
    border: "rgba(11,27,59,0.08)",
    borderHi: "rgba(11,27,59,0.14)",
    success: "#16A34A",
    overlay: "rgba(11,27,59,0.03)",
    overlayHi: "rgba(11,27,59,0.07)",
    onPrimary: "#FFFFFF",
    glow: "rgba(37,99,235,0.16)",
    softTint: "rgba(37,99,235,0.08)",
    motif: "heartbeat",
  },
  meta: {
    title: "Clinic & Healthcare Website Development — Codeebe | Patient Portals & Telemedicine",
    description:
      "Codeebe builds modern, trustworthy healthcare platforms with online appointment booking, patient & doctor portals, telemedicine, prescriptions, lab reports and billing. Get an instant AI cost estimate.",
  },

  hero: {
    badge: "Professional Healthcare Platform Development",
    badgeIcon: "health_and_safety",
    titleLead: "Build a modern healthcare",
    titleHighlight: "experience for your patients",
    subtitle:
      "Give patients a calm, professional digital front door. We build HIPAA-minded healthcare platforms with online appointments, doctor & patient portals, telemedicine, prescriptions, lab reports and secure billing.",
    primaryCta: "Get Instant AI Estimate",
    secondaryCta: "See Live Demo",
    trustPills: [
      { icon: "verified_user", label: "Privacy-first architecture" },
      { icon: "event_available", label: "24/7 online booking" },
      { icon: "medical_services", label: "Telemedicine ready" },
    ],
  },

  dashboard: {
    title: "Clinic Console",
    titleIcon: "clinical_notes",
    kpis: [
      { label: "Appointments Today", value: "86", icon: "event", tint: "primary" },
      { label: "Revenue (MTD)", value: "₹12.7L", icon: "payments", tint: "secondary" },
      { label: "Patient Rating", value: "4.9", icon: "sentiment_satisfied", tint: "success" },
    ],
    chartTitle: "Weekly appointments",
    chartCaption: "Last 7 days",
    bars: [52, 60, 48, 74, 66, 90, 70],
    listTitle: "Department load",
    listRows: [
      { name: "General", pct: 76 },
      { name: "Dental", pct: 54 },
      { name: "Pediatrics", pct: 62 },
    ],
    floatA: { icon: "trending_up", label: "No-shows", value: "-42%" },
    floatB: { icon: "auto_awesome", label: "AI Triage", value: "3 urgent flags" },
  },

  trustedBy: ["CarePlus", "MediTrust", "SmileDental", "VitaClinic", "HealNow", "PrimeHealth", "WellCare"],

  problems: [
    { pain: "Phone lines jammed with appointment calls", painIcon: "phone_disabled", fix: "24/7 online booking lets patients self-schedule with real-time doctor availability — your front desk gets its time back.", fixIcon: "event_available" },
    { pain: "High no-show rates hurt revenue", painIcon: "event_busy", fix: "Automated SMS and email reminders with easy reschedule links cut no-shows dramatically.", fixIcon: "notifications_active" },
    { pain: "Paper records are slow and risky", painIcon: "description", fix: "Secure digital medical records and prescriptions, accessible instantly and safely by authorized staff.", fixIcon: "lock" },
    { pain: "Patients can't reach doctors remotely", painIcon: "videocam_off", fix: "Built-in telemedicine with video consults, e-prescriptions and follow-ups expands your reach beyond the clinic walls.", fixIcon: "video_camera_front" },
    { pain: "Billing and insurance are a maze", painIcon: "receipt_long", fix: "Streamlined billing, invoices and insurance support keep payments clean and transparent.", fixIcon: "account_balance_wallet" },
  ],

  features: [
    { title: "Appointment Booking", desc: "Real-time scheduling by doctor, department and slot with reminders.", icon: "event_available", span: 2, highlight: true },
    { title: "Doctor Profiles", desc: "Credentials, specialties, availability and patient ratings.", icon: "medical_information" },
    { title: "Patient Portal", desc: "Records, prescriptions, reports and history in one secure place.", icon: "personal_injury" },
    { title: "Prescription System", desc: "Digital, legible e-prescriptions with refill tracking.", icon: "medication" },
    { title: "Lab Reports", desc: "Upload, share and notify patients the moment results are ready.", icon: "science" },
    { title: "Telemedicine", desc: "Secure video consultations with in-call notes and payments.", icon: "video_camera_front" },
    { title: "Medical Records", desc: "Structured EMR with role-based access and full audit trails.", icon: "folder_shared" },
    { title: "Insurance & Billing", desc: "Invoices, claims support and transparent patient billing.", icon: "health_and_safety" },
  ],

  showcase: {
    heading: "One platform, every screen",
    subtitle: "From the patient-facing site to the clinical dashboard — see the calm, trustworthy experience your patients will use.",
  },

  estimator: {
    industryLabel: "Clinic & Healthcare Platform",
    platformBaseline: 80000,
    budgetOptions: ["Under ₹3L", "₹3L – ₹6L", "₹6L – ₹12L", "₹12L – ₹25L", "₹25L+"],
    steps: [
      {
        id: "doctors", kind: "scale", eyebrow: "Step 01", title: "How many doctors / practitioners?", subtitle: "This sets the scale of scheduling and portal access.", type: "single", min: 1,
        options: [
          { id: "doc-s", label: "1 – 3 doctors", desc: "Solo / small clinic", icon: "person", cost: 45000 },
          { id: "doc-m", label: "4 – 10 doctors", desc: "Multi-specialty clinic", icon: "groups", cost: 90000 },
          { id: "doc-l", label: "10 – 30 doctors", desc: "Polyclinic", icon: "diversity_3", cost: 150000 },
          { id: "doc-xl", label: "30+ doctors", desc: "Hospital scale", icon: "apartment", cost: 220000 },
        ],
      },
      {
        id: "portals", kind: "feature", eyebrow: "Step 02", title: "Portals & access", subtitle: "Who logs in and what they can do.", type: "multi",
        options: [
          { id: "patient-login", label: "Patient Login", icon: "personal_injury", cost: 45000, suggest: true, tip: "A patient portal reduces repeat calls and builds long-term loyalty." },
          { id: "doctor-login", label: "Doctor Login", icon: "badge", cost: 45000 },
          { id: "appointment", label: "Appointment Booking", icon: "event_available", cost: 55000, suggest: true, tip: "24/7 online booking is the single biggest front-desk time saver." },
          { id: "records", label: "Medical Records (EMR)", icon: "folder_shared", cost: 90000 },
          { id: "reminders", label: "SMS / Email Reminders", icon: "notifications_active", cost: 35000, suggest: true, tip: "Automated reminders typically cut no-shows by 30–40%." },
        ],
      },
      {
        id: "clinical", kind: "feature", eyebrow: "Step 03", title: "Clinical modules", subtitle: "The tools your practitioners use daily.", type: "multi",
        options: [
          { id: "telemedicine", label: "Telemedicine", icon: "video_camera_front", cost: 110000, suggest: true, tip: "Telemedicine extends your reach and adds a new consultation revenue stream." },
          { id: "prescription", label: "Prescription Module", icon: "medication", cost: 50000 },
          { id: "lab", label: "Lab Reports", icon: "science", cost: 55000 },
          { id: "pharmacy", label: "Pharmacy Integration", icon: "local_pharmacy", cost: 70000 },
          { id: "billing", label: "Billing & Invoicing", icon: "receipt_long", cost: 50000 },
          { id: "insurance", label: "Insurance Support", icon: "health_and_safety", cost: 60000 },
        ],
      },
      {
        id: "growth", kind: "feature", eyebrow: "Step 04", title: "Reach & automation", subtitle: "Grow and stay connected with patients.", type: "multi",
        options: [
          { id: "android", label: "Android App", icon: "android", cost: 140000 },
          { id: "ios", label: "iOS App", icon: "phone_iphone", cost: 150000 },
          { id: "whatsapp", label: "WhatsApp Integration", icon: "chat", cost: 45000 },
          { id: "analytics", label: "Analytics Dashboard", icon: "insights", cost: 50000 },
          { id: "multi-branch", label: "Multi-Branch Support", icon: "store", cost: 80000 },
          { id: "reviews", label: "Reviews & Reputation", icon: "reviews", cost: 30000 },
        ],
      },
      {
        id: "timeline", kind: "timeline", eyebrow: "Step 05", title: "How soon do you need to launch?", subtitle: "Faster launches need a larger dedicated team.", type: "single", min: 1,
        options: [
          { id: "tl-flex", label: "Flexible (3 – 5 months)", desc: "Best value", icon: "spa", cost: 0, multiplier: 1.0 },
          { id: "tl-std", label: "Standard (2 – 3 months)", desc: "Balanced", icon: "schedule", cost: 0, multiplier: 1.08 },
          { id: "tl-rush", label: "Rush (5 – 8 weeks)", desc: "Priority team", icon: "bolt", cost: 0, multiplier: 1.2 },
        ],
      },
    ],
  },

  packages: [
    { name: "Starter", price: "₹40,000", period: "one-time", tagline: "A trustworthy clinic website.", cta: "Start with Starter", features: ["Premium multi-page website", "Doctor & service listings", "Contact & enquiry forms", "Google Maps & directions", "WhatsApp click-to-chat", "SEO & mobile optimized"] },
    { name: "Professional", price: "₹1,50,000", period: "one-time", popular: true, tagline: "The complete patient platform.", cta: "Get Professional", features: ["Everything in Starter", "Online appointment booking", "Patient & doctor portals", "SMS / email reminders", "Prescription & records", "Billing & invoicing", "Admin dashboard & analytics"] },
    { name: "Enterprise", price: "₹3,50,000+", period: "custom", tagline: "For hospitals & polyclinics.", cta: "Talk to Sales", features: ["Everything in Professional", "Telemedicine & video consults", "Pharmacy & lab integration", "Android + iOS patient apps", "Multi-branch management", "Insurance & compliance support"] },
  ],

  stats: [
    { value: "90+", label: "Clinics launched", icon: "local_hospital" },
    { value: "42%", label: "Fewer no-shows", icon: "event_available" },
    { value: "1000000+", label: "Appointments booked", icon: "calendar_month" },
    { value: "4.9", label: "Patient rating", icon: "star" },
  ],

  testimonials: [
    { quote: "Our reception was drowning in calls. Online booking freed up the entire front desk and patients love scheduling at midnight.", name: "Dr. Anjali Rao", role: "Founder, CarePlus Clinic", metric: "-58%", metricLabel: "call volume" },
    { quote: "Telemedicine let us keep serving patients who couldn't travel. It paid for itself within two months.", name: "Dr. Sameer Khan", role: "MD, VitaClinic", metric: "+₹3L", metricLabel: "monthly rev" },
    { quote: "Reminders cut our no-shows almost in half. The whole clinic feels calmer and more organised now.", name: "Dr. Neha Gupta", role: "Owner, SmileDental", metric: "-46%", metricLabel: "no-shows" },
  ],

  faqs: [
    { q: "Is patient data kept secure and private?", a: "Yes. We build with encryption, role-based access and full audit trails, following healthcare privacy best practices to protect patient data." },
    { q: "Can patients book appointments 24/7?", a: "Absolutely. Patients see real-time doctor availability and can book, reschedule or cancel anytime, with automatic reminders." },
    { q: "Do you support telemedicine / video consults?", a: "Yes — secure in-platform video consultations with in-call notes, e-prescriptions and integrated payments are available in Professional and Enterprise." },
    { q: "Can it integrate with our lab or pharmacy?", a: "We integrate lab report delivery and pharmacy workflows so results and medicines flow smoothly to patients." },
    { q: "How long does it take to launch?", a: "A clinic website launches in 2–3 weeks. A full patient platform with portals typically takes 8–12 weeks depending on scope." },
  ],

  contact: {
    heading: "Book your free consultation",
    subtitle: "Tell us about your practice. We'll respond within 24 hours with a tailored plan, timeline and quote — no obligation.",
    businessTypes: ["Single Clinic", "Multi-Specialty Clinic", "Dental Clinic", "Hospital", "Diagnostic Lab", "Individual Practitioner"],
    perks: [
      { icon: "schedule", title: "24-hour response", desc: "Real humans, fast replies." },
      { icon: "verified_user", title: "Privacy-first build", desc: "Your patients' data is protected." },
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
