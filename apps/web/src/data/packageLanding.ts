import type { ServiceId } from "./configurator";

export type LandingFeature = {
  icon: string;
  title: string;
  description: string;
};

export type LandingFaq = {
  q: string;
  a: string;
};

export type ShowcaseImage = {
  url: string;
  alt: string;
  caption: string;
  tag?: string;
};

export type ServiceLanding = {
  serviceId: ServiceId;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroStats: { value: string; label: string }[];
  features: LandingFeature[];
  benefitHeading: string;
  benefits: { icon: string; title: string; desc: string }[];
  showcaseImages: ShowcaseImage[];
  demoVideoId: string | null;
  livePreviewUrl?: string;
  livePreviewLabel?: string;
  faq: LandingFaq[];
  formHeading: string;
  formSubtitle: string;
};

export const serviceLandings: Record<ServiceId, ServiceLanding> = {
  "car-rental": {
    serviceId: "car-rental",
    heroTitle: "Build the perfect",
    heroTitleHighlight: "Car Rental Website",
    heroSubtitle:
      "From fleet listings and inquiry forms to real-time availability, deposit collection, and full fleet management — we build car rental platforms that drive bookings.",
    heroStats: [
      { value: "15+", label: "Days to launch" },
      { value: "3", label: "Package tiers" },
      { value: "₹20k", label: "Starting from" },
      { value: "1yr", label: "Hosting included" },
    ],
    features: [
      {
        icon: "directions_car",
        title: "Fleet Listing & Search",
        description:
          "Showcase your entire fleet with advanced filters — type, price, availability, and location. Customers find what they need in seconds.",
      },
      {
        icon: "event_available",
        title: "Real-time Availability",
        description:
          "Live availability calendar shows customers exactly which vehicles are free for their dates — reducing back-and-forth enquiries.",
      },
      {
        icon: "payments",
        title: "Deposit & Payment Gateway",
        description:
          "Collect deposits or full payments online via Razorpay/Stripe. Automate receipts and reduce cash-handling headaches.",
      },
      {
        icon: "location_on",
        title: "Location-based Search",
        description:
          "Let customers search by pick-up location or city. Perfect for multi-city rental operations.",
      },
      {
        icon: "gps_fixed",
        title: "GPS Integration",
        description:
          "Enterprise plan includes GPS tracking integration so you always know where your fleet is — real-time on a dashboard.",
      },
      {
        icon: "phone_android",
        title: "Mobile-first Design",
        description:
          "Over 70% of rental searches happen on mobile. Every page is built to convert on any screen size.",
      },
    ],
    benefitHeading: "Why rental businesses choose Codeebe",
    benefits: [
      {
        icon: "bolt",
        title: "Fast turnaround",
        desc: "Live in as little as 15 days. We ship fast without cutting corners.",
      },
      {
        icon: "handshake",
        title: "Fixed, transparent pricing",
        desc: "No hidden costs. You know what you pay before we write a single line of code.",
      },
      {
        icon: "cloud",
        title: "Hosting & support included",
        desc: "1 year of hosting and up to 60 days post-launch support — all in the package price.",
      },
      {
        icon: "trending_up",
        title: "Built to convert",
        desc: "Every layout decision is backed by conversion best practices — more inquiries, more bookings.",
      },
    ],
    showcaseImages: [
      {
        url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=80",
        alt: "Black luxury car front view",
        caption: "Fleet Showcase Page",
        tag: "Homepage",
      },
      {
        url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80",
        alt: "Car keys on city map",
        caption: "Availability & Booking",
        tag: "Booking",
      },
      {
        url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80",
        alt: "Fleet of vehicles in parking lot",
        caption: "Fleet Management Panel",
        tag: "Admin",
      },
      {
        url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
        alt: "Sports car on road",
        caption: "Vehicle Detail Page",
        tag: "Listings",
      },
    ],
    demoVideoId: null,
    livePreviewUrl: "https://www.shubhsafarrentals.com/",
    livePreviewLabel: "Shubh Safar Rentals — Live client site",
    faq: [
      {
        q: "How long does it take to build a car rental website?",
        a: "Basics launches in 15–18 days, Professional in 25–30 days, and Enterprise in 40–50 days — after content/assets are received from you.",
      },
      {
        q: "Can I manage my fleet myself after launch?",
        a: "Yes. All plans include an admin panel where you can add/remove vehicles, update pricing, and manage availability without touching code.",
      },
      {
        q: "Which payment gateways are supported?",
        a: "We integrate Razorpay, Stripe, PayU, and CCAvenue. If you have a preferred gateway we'll confirm compatibility during scoping.",
      },
      {
        q: "Do I need to provide photos and content?",
        a: "Yes — you'll provide vehicle photos, descriptions, and pricing. We handle all design and development from there.",
      },
      {
        q: "Is the website SEO-friendly?",
        a: "Absolutely. All sites are built with semantic HTML, fast load times, and on-page SEO best practices from day one.",
      },
    ],
    formHeading: "Get a quote for your Car Rental website",
    formSubtitle: "Tell us about your fleet and we'll have a detailed quote ready within 24 hours.",
  },

  "ecommerce": {
    serviceId: "ecommerce",
    heroTitle: "Launch your",
    heroTitleHighlight: "Online Store",
    heroSubtitle:
      "WooCommerce, Shopify, or a fully custom-built store — we deliver eCommerce sites that load fast, look great, and convert visitors into customers.",
    heroStats: [
      { value: "15+", label: "Days to launch" },
      { value: "2", label: "Package tiers" },
      { value: "₹20k", label: "Starting from" },
      { value: "1yr", label: "Hosting included" },
    ],
    features: [
      {
        icon: "storefront",
        title: "Product Catalog",
        description:
          "Up to 100 products on CMS plan, unlimited on Custom. Full product variants, images, and inventory management built in.",
      },
      {
        icon: "shopping_cart",
        title: "Smart Cart & Checkout",
        description:
          "A frictionless checkout flow designed to reduce cart abandonment and boost conversions — with one-click payment support.",
      },
      {
        icon: "payments",
        title: "Payment Gateway",
        description:
          "Accept payments via Razorpay, Stripe, PayU, or COD. Automated order confirmations and invoices included.",
      },
      {
        icon: "inventory_2",
        title: "Inventory Management",
        description:
          "Track stock levels, get low-stock alerts, and manage orders from a clean admin dashboard.",
      },
      {
        icon: "local_shipping",
        title: "Shipping Integration",
        description:
          "Integrate with Shiprocket, Delhivery, or any other logistics partner for real-time shipping rates and tracking.",
      },
      {
        icon: "search",
        title: "SEO & Performance",
        description:
          "Lightning-fast pages, structured product data, and built-in SEO tools to help you rank higher and sell more.",
      },
    ],
    benefitHeading: "Why D2C brands trust Codeebe",
    benefits: [
      {
        icon: "speed",
        title: "Performance-first builds",
        desc: "Sub-2s load times out of the box. Fast stores convert 2× better.",
      },
      {
        icon: "palette",
        title: "Custom to your brand",
        desc: "No generic templates. Every store is designed to match your brand identity.",
      },
      {
        icon: "cloud",
        title: "Hosting & support included",
        desc: "1 year hosting and 60 days post-launch support built into every package.",
      },
      {
        icon: "expand",
        title: "Ready to scale",
        desc: "Built on proven platforms that grow with your catalog and order volume.",
      },
    ],
    showcaseImages: [
      {
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
        alt: "Online fashion store",
        caption: "Product Storefront",
        tag: "Homepage",
      },
      {
        url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=900&q=80",
        alt: "Retail store interior",
        caption: "Category & Filters",
        tag: "Catalog",
      },
      {
        url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80",
        alt: "Shopping bags and laptop",
        caption: "Checkout Flow",
        tag: "Checkout",
      },
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        alt: "Order management dashboard",
        caption: "Admin & Orders",
        tag: "Admin",
      },
    ],
    demoVideoId: null,
    faq: [
      {
        q: "What's the difference between CMS Plan and Custom Build?",
        a: "CMS Plan uses WooCommerce or Shopify for faster deployment and lower cost. Custom Build is a tailor-made architecture for brands that need unique checkout flows, complex integrations, or higher performance at scale.",
      },
      {
        q: "Can I manage products myself after launch?",
        a: "Yes. Both plans include an easy-to-use admin panel to add products, manage orders, update pricing, and apply discounts.",
      },
      {
        q: "How many products can I list?",
        a: "Up to 100 products are set up during the project on the CMS plan. Custom Build has no practical limit.",
      },
      {
        q: "Do you integrate with WhatsApp or social media?",
        a: "Yes — WhatsApp chat widget, Instagram shop feed, and social sharing are available as add-ons.",
      },
      {
        q: "Is the store mobile-optimised?",
        a: "Every store is mobile-first by default. All checkout flows are tested thoroughly on iOS and Android.",
      },
    ],
    formHeading: "Get a quote for your Online Store",
    formSubtitle: "Tell us about your products and we'll send a detailed proposal within 24 hours.",
  },

  "gym": {
    serviceId: "gym",
    heroTitle: "Get more members with a",
    heroTitleHighlight: "Gym & Fitness Website",
    heroSubtitle:
      "From class schedules and trainer profiles to online memberships and booking — we build gym websites that attract, convert, and retain members.",
    heroStats: [
      { value: "10+", label: "Days to launch" },
      { value: "3", label: "Package tiers" },
      { value: "₹15k", label: "Starting from" },
      { value: "1yr", label: "Hosting included" },
    ],
    features: [
      {
        icon: "fitness_center",
        title: "Membership Plans",
        description:
          "Display your membership tiers clearly — monthly, quarterly, annual. Let prospects compare and purchase online.",
      },
      {
        icon: "event_available",
        title: "Class Schedule & Booking",
        description:
          "Live class timetable with online slot booking. Members can reserve spots, get reminders, and cancel easily.",
      },
      {
        icon: "person",
        title: "Trainer Profiles",
        description:
          "Showcase your team of trainers — certifications, specialties, and individual booking pages.",
      },
      {
        icon: "payments",
        title: "Online Payment Gateway",
        description:
          "Accept membership fees and class bookings online via Razorpay or Stripe. Automate receipts and renewal reminders.",
      },
      {
        icon: "stars",
        title: "Loyalty & Rewards",
        description:
          "Enterprise plan includes a loyalty points system to retain long-term members and reward referrals.",
      },
      {
        icon: "bar_chart",
        title: "Analytics Dashboard",
        description:
          "Track member growth, class attendance, and revenue trends from a clean admin dashboard.",
      },
    ],
    benefitHeading: "Why fitness businesses choose Codeebe",
    benefits: [
      {
        icon: "bolt",
        title: "Ready in 10–45 days",
        desc: "From brief to live in as little as 10 days for the Basics plan.",
      },
      {
        icon: "devices",
        title: "Mobile-first",
        desc: "Members manage bookings and track schedules from their phones — your site must work perfectly on mobile.",
      },
      {
        icon: "cloud",
        title: "Hosting & support included",
        desc: "Full hosting and post-launch support included in every package.",
      },
      {
        icon: "handshake",
        title: "Fixed pricing",
        desc: "No surprise invoices. Agree the price before we start — that's it.",
      },
    ],
    showcaseImages: [
      {
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
        alt: "Modern gym interior",
        caption: "Gym Homepage",
        tag: "Homepage",
      },
      {
        url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80",
        alt: "Personal trainer with client",
        caption: "Trainer Profiles",
        tag: "Trainers",
      },
      {
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
        alt: "Gym equipment weights",
        caption: "Class Schedule",
        tag: "Schedule",
      },
      {
        url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
        alt: "Fitness app on mobile",
        caption: "Membership Portal",
        tag: "Members",
      },
    ],
    demoVideoId: null,
    faq: [
      {
        q: "Can members book classes directly on the website?",
        a: "Yes — Professional and Enterprise plans include an online class booking system with real-time slot availability.",
      },
      {
        q: "Can I take membership payments online?",
        a: "Absolutely. Professional and Enterprise plans integrate with Razorpay or Stripe so members can pay and renew online.",
      },
      {
        q: "Can I manage multiple branches?",
        a: "Yes — the Enterprise plan supports multi-branch management with separate class schedules, trainers, and reporting per location.",
      },
      {
        q: "Will you help migrate content from my existing website?",
        a: "Yes, basic content migration (text, trainer bios, class info) is included at no extra cost.",
      },
      {
        q: "Can members log in and view their profile?",
        a: "Professional and Enterprise plans include a member portal where users can view bookings, membership status, and payment history.",
      },
    ],
    formHeading: "Get a quote for your Gym website",
    formSubtitle: "Share your gym details and we'll have a tailored proposal ready within 24 hours.",
  },

  "event-management": {
    serviceId: "event-management",
    heroTitle: "Sell tickets & manage",
    heroTitleHighlight: "Events Online",
    heroSubtitle:
      "From event listings and registration forms to online ticketing, seat selection, and QR check-in — we build event platforms that fill seats.",
    heroStats: [
      { value: "10+", label: "Days to launch" },
      { value: "3", label: "Package tiers" },
      { value: "₹18k", label: "Starting from" },
      { value: "1yr", label: "Hosting included" },
    ],
    features: [
      {
        icon: "event",
        title: "Event Listings",
        description:
          "Beautifully designed event pages with date, venue, agenda, speakers, and gallery. All easy to manage from the admin.",
      },
      {
        icon: "confirmation_number",
        title: "Online Ticketing",
        description:
          "Sell tickets directly from your website. Multiple ticket tiers (Early Bird, VIP, General) with custom pricing.",
      },
      {
        icon: "chair",
        title: "Seat / Slot Selection",
        description:
          "Interactive seat maps or time-slot selection for structured events — letting attendees choose exactly where they sit or when they arrive.",
      },
      {
        icon: "qr_code_scanner",
        title: "QR Code Check-in",
        description:
          "Each ticket comes with a unique QR code. Staff scan at entry for instant verification — no paper lists needed.",
      },
      {
        icon: "payments",
        title: "Payment Gateway",
        description:
          "Integrated Razorpay or Stripe checkout. Automated order confirmation and ticket delivery via email.",
      },
      {
        icon: "people",
        title: "Attendee Management",
        description:
          "Export attendee lists, track registrations in real time, and send bulk communications from the admin dashboard.",
      },
    ],
    benefitHeading: "Why event organisers choose Codeebe",
    benefits: [
      {
        icon: "bolt",
        title: "Fast deployment",
        desc: "Get your event site live before your promotion window closes — we move fast.",
      },
      {
        icon: "payments",
        title: "Keep your ticket revenue",
        desc: "No per-ticket platform fees. Just your gateway's standard processing rate.",
      },
      {
        icon: "cloud",
        title: "Hosting & support included",
        desc: "1 year hosting and post-launch support across all plans.",
      },
      {
        icon: "trending_up",
        title: "Optimised to sell",
        desc: "Every landing page, CTA, and checkout step is designed to maximise ticket sales.",
      },
    ],
    showcaseImages: [
      {
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
        alt: "Large event crowd with lights",
        caption: "Event Landing Page",
        tag: "Homepage",
      },
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
        alt: "Business conference audience",
        caption: "Event Registration",
        tag: "Registration",
      },
      {
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
        alt: "Speaker at conference",
        caption: "Speaker & Agenda",
        tag: "Agenda",
      },
      {
        url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80",
        alt: "QR code scanning at event",
        caption: "Ticket & QR Check-in",
        tag: "Ticketing",
      },
    ],
    demoVideoId: null,
    faq: [
      {
        q: "Can I sell different ticket types (VIP, Early Bird, General)?",
        a: "Yes — Professional and Enterprise plans support multiple ticket categories with individual pricing, quotas, and availability dates.",
      },
      {
        q: "How does QR code check-in work?",
        a: "Each attendee receives a unique QR code by email after purchase. Your staff scan it at entry using any smartphone — our system validates it instantly.",
      },
      {
        q: "Can I manage multiple events from one website?",
        a: "Yes — the Enterprise plan supports a full multi-event calendar with individual pages, separate ticketing, and unified reporting.",
      },
      {
        q: "Do attendees get automatic confirmation emails?",
        a: "Yes. Ticket confirmations, reminders, and event updates are all automated.",
      },
      {
        q: "Can I offer promo / discount codes?",
        a: "Yes, coupon and discount code functionality is available on Professional and Enterprise plans.",
      },
    ],
    formHeading: "Get a quote for your Event Management website",
    formSubtitle: "Tell us about your events and we'll send a proposal within 24 hours.",
  },

  "clinic": {
    serviceId: "clinic",
    heroTitle: "Build trust with a professional",
    heroTitleHighlight: "Healthcare Website",
    heroSubtitle:
      "Doctor profiles, online appointment booking, patient portals, and full hospital management systems — designed for clinics, hospitals, and healthcare professionals.",
    heroStats: [
      { value: "10+", label: "Days to launch" },
      { value: "3", label: "Package tiers" },
      { value: "₹18k", label: "Starting from" },
      { value: "1yr", label: "Hosting included" },
    ],
    features: [
      {
        icon: "medical_services",
        title: "Doctor & Specialist Profiles",
        description:
          "Detailed profiles for each doctor — qualifications, specialties, availability, and individual booking links.",
      },
      {
        icon: "event_available",
        title: "Online Appointment Booking",
        description:
          "Patients book appointments 24/7 from any device. Real-time slot availability, instant confirmation emails.",
      },
      {
        icon: "person",
        title: "Patient Portal",
        description:
          "Secure login for patients to view upcoming appointments, past visit notes, prescriptions, and lab reports.",
      },
      {
        icon: "notifications_active",
        title: "SMS & Email Reminders",
        description:
          "Automated appointment reminders reduce no-shows significantly. Patients get reminders at 24h and 2h before.",
      },
      {
        icon: "receipt_long",
        title: "Billing & Invoicing",
        description:
          "Enterprise plan includes full billing module — generate invoices, track payments, and manage insurance claims.",
      },
      {
        icon: "science",
        title: "Lab & Pharmacy Module",
        description:
          "Enterprise HMS includes lab report management and pharmacy inventory integration for full clinic operations.",
      },
    ],
    benefitHeading: "Why healthcare providers choose Codeebe",
    benefits: [
      {
        icon: "verified",
        title: "Trust-first design",
        desc: "Every design decision builds patient confidence — clean, professional, and reassuring.",
      },
      {
        icon: "lock",
        title: "Secure & compliant",
        desc: "All patient data handled securely. HTTPS enforced, data encrypted at rest.",
      },
      {
        icon: "cloud",
        title: "Hosting & support included",
        desc: "1 year hosting and up to 90 days post-launch support — the most in any category.",
      },
      {
        icon: "handshake",
        title: "Fixed, honest pricing",
        desc: "No per-patient fees, no platform lock-in. One-time build cost, yours to keep.",
      },
    ],
    showcaseImages: [
      {
        url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
        alt: "Modern hospital corridor",
        caption: "Clinic Homepage",
        tag: "Homepage",
      },
      {
        url: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=900&q=80",
        alt: "Doctor using digital tablet",
        caption: "Doctor Profiles",
        tag: "Doctors",
      },
      {
        url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
        alt: "Doctor with stethoscope",
        caption: "Appointment Booking",
        tag: "Booking",
      },
      {
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
        alt: "Patient management dashboard",
        caption: "Patient Portal",
        tag: "Portal",
      },
    ],
    demoVideoId: null,
    faq: [
      {
        q: "Can patients book appointments directly from the website?",
        a: "Yes — Professional and Enterprise plans include a full online booking system with real-time doctor availability.",
      },
      {
        q: "Is patient data kept secure?",
        a: "Absolutely. All data is encrypted in transit and at rest. Login sessions are secured with industry-standard authentication.",
      },
      {
        q: "Can multiple doctors manage their own schedules?",
        a: "Yes — each doctor gets their own login to manage availability, view their appointment list, and update their profile.",
      },
      {
        q: "Does the Enterprise HMS include billing?",
        a: "Yes — the Enterprise plan includes a full billing module with invoice generation, payment tracking, and basic insurance claim support.",
      },
      {
        q: "Can I start with Basics and upgrade later?",
        a: "Yes. We design all plans with future upgrades in mind. Moving from Basics to Professional is straightforward.",
      },
    ],
    formHeading: "Get a quote for your Clinic website",
    formSubtitle: "Tell us about your practice and we'll have a proposal ready in 24 hours.",
  },

  "consulting-sites": {
    serviceId: "consulting-sites",
    heroTitle: "Win more clients with a",
    heroTitleHighlight: "Consulting Website",
    heroSubtitle:
      "Professional, high-converting consulting and business websites that establish authority, capture leads, and turn visitors into paying clients.",
    heroStats: [
      { value: "10+", label: "Days to launch" },
      { value: "2", label: "Package tiers" },
      { value: "₹10k", label: "Starting from" },
      { value: "1yr", label: "Hosting included" },
    ],
    features: [
      {
        icon: "web",
        title: "Up to 12 Pages",
        description:
          "From a clean 5-page starter to a comprehensive 12-page site — home, about, services, case studies, blog, and contact.",
      },
      {
        icon: "form_edit",
        title: "Lead Capture Forms",
        description:
          "Strategically placed forms and CTAs that capture visitor interest and feed inquiries directly to your inbox.",
      },
      {
        icon: "article",
        title: "Blog Section",
        description:
          "Professional plan includes a full blog to establish thought leadership and drive organic search traffic.",
      },
      {
        icon: "palette",
        title: "Custom UI Design",
        description:
          "No templates. Every site is designed from scratch to reflect your brand, positioning, and target audience.",
      },
      {
        icon: "search",
        title: "SEO Ready",
        description:
          "On-page SEO, structured data, fast load times, and meta tags configured out of the box.",
      },
      {
        icon: "phone_android",
        title: "Mobile-responsive",
        description:
          "Pixel-perfect on every screen size — desktop, tablet, and mobile — from day one.",
      },
    ],
    benefitHeading: "Why consultants choose Codeebe",
    benefits: [
      {
        icon: "bolt",
        title: "Live in 10–20 days",
        desc: "Fast turnaround so you can start winning clients sooner.",
      },
      {
        icon: "palette",
        title: "Fully custom design",
        desc: "Your website should look as professional as your work — no generic templates.",
      },
      {
        icon: "cloud",
        title: "Hosting & support included",
        desc: "1 year hosting and 45 days of post-launch support in every package.",
      },
      {
        icon: "trending_up",
        title: "Conversion-focused",
        desc: "Every page is structured to guide visitors toward contacting you.",
      },
    ],
    showcaseImages: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
        alt: "Modern corporate office",
        caption: "Professional Homepage",
        tag: "Homepage",
      },
      {
        url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
        alt: "Business meeting in progress",
        caption: "About & Services",
        tag: "About",
      },
      {
        url: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&w=900&q=80",
        alt: "Team working on project",
        caption: "Case Studies",
        tag: "Portfolio",
      },
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        alt: "Lead capture form on laptop",
        caption: "Contact & Lead Forms",
        tag: "Contact",
      },
    ],
    demoVideoId: null,
    faq: [
      {
        q: "What's included in the Basics plan?",
        a: "A clean, mobile-responsive 5-page site with contact form, hosting, and 45 days support — perfect for getting online quickly.",
      },
      {
        q: "Can I add more pages later?",
        a: "Yes. Additional pages can be added after launch as an add-on service.",
      },
      {
        q: "Do I need to provide the content?",
        a: "Yes — you provide the copy, images, and branding. We handle design and development. We can advise on structure if needed.",
      },
      {
        q: "Is a CMS (content management system) included?",
        a: "Yes — you can edit text, images, and blog posts yourself without touching code.",
      },
      {
        q: "Can you integrate a contact/booking form?",
        a: "Yes, inquiry and contact forms are included in all plans. Calendly integration is available on request.",
      },
    ],
    formHeading: "Get a quote for your Consulting website",
    formSubtitle: "Tell us about your business and we'll send a tailored proposal within 24 hours.",
  },

  "book-appointment": {
    serviceId: "book-appointment",
    heroTitle: "Let customers book",
    heroTitleHighlight: "Appointments 24/7",
    heroSubtitle:
      "Online booking systems with calendar sync, service catalogs, and optional multi-staff scheduling — so you spend less time on the phone and more time serving clients.",
    heroStats: [
      { value: "12+", label: "Days to launch" },
      { value: "2", label: "Package tiers" },
      { value: "₹18k", label: "Starting from" },
      { value: "1yr", label: "Hosting included" },
    ],
    features: [
      {
        icon: "event_available",
        title: "Online Booking Engine",
        description:
          "Customers pick a service, choose a date and time, and confirm — all without calling you. Available 24/7.",
      },
      {
        icon: "calendar_month",
        title: "Calendar Sync",
        description:
          "Two-way sync with Google Calendar or Outlook so your team always sees appointments in the tools they already use.",
      },
      {
        icon: "category",
        title: "Service Catalog",
        description:
          "List every service with description, duration, and pricing. Customers know exactly what they're booking.",
      },
      {
        icon: "group",
        title: "Multi-staff Scheduling",
        description:
          "Professional plan lets each staff member manage their own calendar and availability — ideal for salons and clinics.",
      },
      {
        icon: "payments",
        title: "Payment Gateway",
        description:
          "Collect deposits or full payments at the time of booking. Reduces no-shows dramatically.",
      },
      {
        icon: "notifications",
        title: "Automated Reminders",
        description:
          "Email and SMS reminders go out automatically — confirmation, 24h before, and 1h before the appointment.",
      },
    ],
    benefitHeading: "Why service businesses choose Codeebe",
    benefits: [
      {
        icon: "schedule",
        title: "Reduce no-shows by 60%",
        desc: "Automated reminders and online deposits keep your calendar full.",
      },
      {
        icon: "phone_disabled",
        title: "Stop taking phone bookings",
        desc: "Free up your time — the website handles bookings around the clock.",
      },
      {
        icon: "cloud",
        title: "Hosting & support included",
        desc: "1 year hosting and post-launch support in every plan.",
      },
      {
        icon: "handshake",
        title: "Fixed pricing",
        desc: "No monthly SaaS fees. One-time build cost — yours to keep.",
      },
    ],
    showcaseImages: [
      {
        url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=80",
        alt: "Calendar planning on desk",
        caption: "Booking Calendar",
        tag: "Calendar",
      },
      {
        url: "https://images.unsplash.com/photo-1521791055366-0d553872952f?auto=format&fit=crop&w=900&q=80",
        alt: "Salon appointment",
        caption: "Service Selection",
        tag: "Services",
      },
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
        alt: "Booking management dashboard",
        caption: "Staff Schedule View",
        tag: "Dashboard",
      },
      {
        url: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=80",
        alt: "Mobile appointment confirmation",
        caption: "Confirmation & Reminders",
        tag: "Notifications",
      },
    ],
    demoVideoId: null,
    faq: [
      {
        q: "What types of businesses does this work for?",
        a: "Salons, spas, clinics, physiotherapy, tutors, photography studios, personal trainers, lawyers — any service business that takes appointments.",
      },
      {
        q: "Can I have multiple staff with their own calendars?",
        a: "Yes — the Professional plan supports multi-staff scheduling, each with their own availability and booking page.",
      },
      {
        q: "Can customers reschedule or cancel online?",
        a: "Yes. Customers can reschedule or cancel within your policy window directly from their confirmation email.",
      },
      {
        q: "Do customers receive confirmation emails?",
        a: "Yes — instant booking confirmation, reminders, and cancellation notices are all automated.",
      },
      {
        q: "Can I collect a deposit at the time of booking?",
        a: "Yes. Deposit collection via Razorpay or Stripe is included in the Professional plan.",
      },
    ],
    formHeading: "Get a quote for your Booking website",
    formSubtitle: "Tell us about your services and we'll send a tailored proposal within 24 hours.",
  },

  "management-system": {
    serviceId: "management-system",
    heroTitle: "Streamline your business with a",
    heroTitleHighlight: "Custom Management System",
    heroSubtitle:
      "Admin dashboards, user roles, workflow automation, and full ERP/CRM modules — built to the exact requirements of your organisation.",
    heroStats: [
      { value: "25+", label: "Days to launch" },
      { value: "3", label: "Package tiers" },
      { value: "₹40k", label: "Starting from" },
      { value: "1yr", label: "Hosting included" },
    ],
    features: [
      {
        icon: "dashboard",
        title: "Admin Dashboard",
        description:
          "A clean, role-aware dashboard giving each user a view of exactly what they need — nothing more, nothing less.",
      },
      {
        icon: "manage_accounts",
        title: "User Roles & Permissions",
        description:
          "Fine-grained access control. Admins, managers, and staff each see and do only what they're authorised to.",
      },
      {
        icon: "account_tree",
        title: "Workflow Automation",
        description:
          "Automate repetitive approval chains, notifications, and status updates across departments.",
      },
      {
        icon: "bar_chart",
        title: "Analytics & Reporting",
        description:
          "Real-time charts and exportable reports give management the insight to make faster, better decisions.",
      },
      {
        icon: "hub",
        title: "Custom ERP / CRM Modules",
        description:
          "Enterprise plan includes fully custom ERP or CRM modules designed around your specific business processes.",
      },
      {
        icon: "storage",
        title: "Enterprise Database Setup",
        description:
          "Optimised, scalable database architecture for large datasets and concurrent multi-department usage.",
      },
    ],
    benefitHeading: "Why organisations choose Codeebe",
    benefits: [
      {
        icon: "build",
        title: "Built to your exact process",
        desc: "No forcing your team to adapt to a generic tool — we build around how you already work.",
      },
      {
        icon: "lock",
        title: "Secure & role-controlled",
        desc: "Enterprise-grade access control keeps sensitive data in the right hands.",
      },
      {
        icon: "cloud",
        title: "Hosting & support included",
        desc: "Up to 90 days post-launch support — the most in any Codeebe package.",
      },
      {
        icon: "expand",
        title: "Scales with your team",
        desc: "Built to handle growing user counts, data volumes, and new departments over time.",
      },
    ],
    showcaseImages: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
        alt: "Analytics dashboard on screen",
        caption: "Admin Dashboard",
        tag: "Dashboard",
      },
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
        alt: "Business analytics charts",
        caption: "Analytics & Reports",
        tag: "Analytics",
      },
      {
        url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=80",
        alt: "Team workflow management",
        caption: "Workflow Automation",
        tag: "Workflows",
      },
      {
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80",
        alt: "User roles and permissions screen",
        caption: "User Roles & Permissions",
        tag: "Access Control",
      },
    ],
    demoVideoId: null,
    faq: [
      {
        q: "What's the difference between the three plans?",
        a: "Basics covers a core admin dashboard with user roles. Professional adds workflow automation and multi-department analytics. Enterprise is a fully custom ERP/CRM build with dedicated architecture.",
      },
      {
        q: "Can you integrate with our existing tools?",
        a: "Yes — common integrations include Tally, Excel import/export, WhatsApp notifications, and third-party APIs. Complex integrations are scoped individually.",
      },
      {
        q: "How do you handle data migration from our current system?",
        a: "We assess your current data during discovery. Basic CSV/Excel imports are included; complex migrations are quoted separately.",
      },
      {
        q: "Can the system run on our own servers?",
        a: "Yes — self-hosted deployment on your own infrastructure is available for Enterprise clients.",
      },
      {
        q: "Is training provided?",
        a: "Yes. A handover session and documentation are included for all plans. Extended training sessions can be arranged.",
      },
    ],
    formHeading: "Get a quote for your Management System",
    formSubtitle: "Describe your workflow and we'll scope the right solution within 24 hours.",
  },
};

export function getServiceLanding(id: ServiceId): ServiceLanding {
  return serviceLandings[id];
}
