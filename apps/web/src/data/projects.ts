export type Project = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  techStack: string[];
  overview: string;
  problemSolved: string;
  keyFeatures: string[];
  businessValue: string;
  costRange: string;
};

export const projects: Project[] = [
  {
    slug: "cricrumble",
    name: "CricRumble",
    category: "Sports / Gaming Platform",
    shortDescription:
      "Cricket-focused engagement platform with live updates, contests, and community features.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    overview:
      "CricRumble is a cricket fan engagement product designed to keep users active around matches, leagues, and fantasy-style interactions.",
    problemSolved:
      "Fans needed a single destination for match context, participation, and real-time engagement instead of scattered social feeds.",
    keyFeatures: [
      "Live match widgets",
      "User profiles & leaderboards",
      "Contest participation",
      "Admin content management",
      "Notification-ready architecture",
    ],
    businessValue:
      "Increased session time and repeat visits through structured engagement loops around cricket events.",
    costRange: "₹3,00,000 – ₹8,00,000",
  },
  {
    slug: "influventure",
    name: "Influventure",
    category: "Influencer / Campaign Platform",
    shortDescription:
      "Platform connecting brands with influencers for campaign discovery and collaboration.",
    techStack: ["React", "NestJS", "PostgreSQL", "AWS"],
    overview:
      "Influventure streamlines influencer marketing workflows from discovery to campaign tracking.",
    problemSolved:
      "Brands struggled to coordinate influencer outreach, deliverables, and reporting in spreadsheets and DMs.",
    keyFeatures: [
      "Influencer profiles",
      "Campaign listings",
      "Brand dashboards",
      "Application workflows",
      "Analytics summaries",
    ],
    businessValue:
      "Faster campaign launches and clearer ROI visibility for marketing teams.",
    costRange: "₹2,50,000 – ₹7,00,000",
  },
  {
    slug: "scanpubs",
    name: "Scanpubs",
    category: "Publishing / QR Platform",
    shortDescription:
      "QR-based publishing solution for digital content access and publication management.",
    techStack: ["Next.js", "API", "MongoDB", "Cloud Storage"],
    overview:
      "Scanpubs helps publishers bridge print and digital with scannable experiences and managed content.",
    problemSolved:
      "Publishers needed a simple way to attach rich digital experiences to physical materials.",
    keyFeatures: [
      "QR generation & tracking",
      "Content library",
      "Publisher admin",
      "Access analytics",
      "Multi-format support",
    ],
    businessValue:
      "Measurable engagement from print campaigns and reduced friction for readers.",
    costRange: "₹1,50,000 – ₹5,00,000",
  },
  {
    slug: "shubh-safar-car-rental",
    name: "Shubh Safar Car Rental",
    category: "Booking / Rental",
    shortDescription:
      "Car rental booking website with fleet showcase, inquiries, and admin-friendly content.",
    techStack: ["WordPress", "Custom Theme", "PHP", "MySQL"],
    overview:
      "Shubh Safar presents rental fleets online and captures booking inquiries with a trustworthy brand experience.",
    problemSolved:
      "Manual phone-only bookings limited reach and made fleet availability hard to communicate.",
    keyFeatures: [
      "Fleet catalog",
      "Booking inquiry forms",
      "Location & pricing pages",
      "SEO-ready structure",
      "Mobile-responsive UI",
    ],
    businessValue:
      "More qualified inbound leads and 24/7 visibility for rental services.",
    costRange: "₹60,000 – ₹2,00,000",
  },
  {
    slug: "weboku-agency",
    name: "Weboku Agency",
    category: "Agency Website",
    shortDescription:
      "Premium agency portfolio site showcasing services, work, and lead capture.",
    techStack: ["Next.js", "Tailwind CSS", "CMS-ready"],
    overview:
      "Weboku Agency’s site positions the brand as a modern digital partner with clear service positioning.",
    problemSolved:
      "The agency needed a credible web presence that converts visitors into consultation requests.",
    keyFeatures: [
      "Service pages",
      "Portfolio grid",
      "Contact & CTA flows",
      "Performance-optimized pages",
      "Brand-focused design system",
    ],
    businessValue:
      "Stronger inbound pipeline and improved trust during sales conversations.",
    costRange: "₹25,000 – ₹80,000",
  },
  {
    slug: "sthulas-ecommerce",
    name: "Sthulas eCommerce",
    category: "eCommerce",
    shortDescription:
      "Online store for product catalog, cart, and streamlined checkout experience.",
    techStack: ["WooCommerce", "WordPress", "Payment Gateway"],
    overview:
      "Sthulas eCommerce enables product sales online with catalog management and order workflows.",
    problemSolved:
      "Retail needed to move beyond offline-only sales with a manageable online storefront.",
    keyFeatures: [
      "Product catalog",
      "Cart & checkout",
      "Order notifications",
      "Category management",
      "Mobile shopping UX",
    ],
    businessValue:
      "Expanded sales channels and easier inventory presentation for customers.",
    costRange: "₹50,000 – ₹1,50,000",
  },
  {
    slug: "leatherkart-ecommerce",
    name: "LeatherKart eCommerce",
    category: "eCommerce / Fashion",
    shortDescription:
      "Leather goods store with rich product presentation and conversion-focused UX.",
    techStack: ["Shopify / WooCommerce", "Custom UI", "SEO"],
    overview:
      "LeatherKart showcases premium leather products with imagery-led pages and smooth purchase flows.",
    problemSolved:
      "Generic templates failed to reflect product quality and brand positioning.",
    keyFeatures: [
      "Product galleries",
      "Variant selection",
      "Promotions support",
      "Trust elements (reviews, policies)",
      "SEO product pages",
    ],
    businessValue:
      "Higher perceived brand value and improved conversion on high-ticket items.",
    costRange: "₹80,000 – ₹2,00,000",
  },
  {
    slug: "dream-drive-car-rental",
    name: "Dream Drive Car Rental",
    category: "Booking / Rental",
    shortDescription:
      "Car rental platform with booking flows, vehicle listings, and customer-friendly UX.",
    techStack: ["React", "Node.js", "PostgreSQL"],
    overview:
      "Dream Drive offers end-to-end rental discovery with availability-focused booking journeys.",
    problemSolved:
      "Customers wanted instant clarity on vehicles, pricing, and booking steps without back-and-forth calls.",
    keyFeatures: [
      "Vehicle search & filters",
      "Booking calendar",
      "Admin fleet management",
      "Customer accounts",
      "Email confirmations",
    ],
    businessValue:
      "Reduced manual coordination and faster booking completion.",
    costRange: "₹1,00,000 – ₹3,00,000",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
