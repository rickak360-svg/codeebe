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
  screenshots?: string[];
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
    screenshots: [
      "/projects/cricrumble/01-homepage-match-feed.png",
      "/projects/cricrumble/02-choose-champion-onboarding.png",
      "/projects/cricrumble/03-forge-identity-onboarding.png",
      "/projects/cricrumble/04-dashboard-arena-festival.png",
      "/projects/cricrumble/05-battles-lobby.png",
      "/projects/cricrumble/06-community-dashboard.png",
      "/projects/cricrumble/07-live-match-scorecard.png",
      "/projects/cricrumble/08-live-scoreboard.png",
    ],
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
    screenshots: [
      "/projects/influventure/01-homepage-hero.png",
      "/projects/influventure/02-campaign-visuals-hero.png",
      "/projects/influventure/03-authenticity-signals.png",
      "/projects/influventure/04-platform-infrastructure.png",
      "/projects/influventure/05-trust-payments-compliance.png",
      "/projects/influventure/06-create-account.png",
      "/projects/influventure/07-buyer-dashboard.png",
      "/projects/influventure/08-category-marketplace.png",
    ],
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
    screenshots: [
      "/projects/shubh-safar-car-rental/01-homepage-booking-hero.png",
      "/projects/shubh-safar-car-rental/02-fleet-page.png",
      "/projects/shubh-safar-car-rental/03-fleet-grid.png",
      "/projects/shubh-safar-car-rental/04-travel-comfort-hero.png",
      "/projects/shubh-safar-car-rental/05-how-it-works.png",
      "/projects/shubh-safar-car-rental/06-book-now-contact.png",
      "/projects/shubh-safar-car-rental/07-car-owner-partnership.png",
      "/projects/shubh-safar-car-rental/08-partnership-steps.png",
    ],
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
    screenshots: [
      "/projects/weboku-agency/01-homepage-hero.png",
      "/projects/weboku-agency/02-meta-google-ads-hero.png",
      "/projects/weboku-agency/03-proven-results-case-study.png",
      "/projects/weboku-agency/04-case-studies-section.png",
      "/projects/weboku-agency/05-digital-marketing-process.png",
      "/projects/weboku-agency/06-growth-strategy-engine.png",
      "/projects/weboku-agency/07-portfolio-page.png",
      "/projects/weboku-agency/08-blog-page.png",
    ],
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
    screenshots: [
      "/projects/sthulas-ecommerce/01-homepage-hero.png",
      "/projects/sthulas-ecommerce/02-collections-grid.png",
      "/projects/sthulas-ecommerce/03-finest-handicrafts.png",
      "/projects/sthulas-ecommerce/04-trend-wear-hero.png",
      "/projects/sthulas-ecommerce/05-bamboo-craft.png",
      "/projects/sthulas-ecommerce/06-featured-products.png",
      "/projects/sthulas-ecommerce/07-sale-subscribe.png",
      "/projects/sthulas-ecommerce/08-new-arrivals.png",
    ],
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
    screenshots: [
      "/projects/leatherkart-ecommerce/01-homepage-hero.png",
      "/projects/leatherkart-ecommerce/02-home-decor-categories.png",
      "/projects/leatherkart-ecommerce/03-promotional-banners.png",
      "/projects/leatherkart-ecommerce/04-australian-owned-banner.png",
      "/projects/leatherkart-ecommerce/05-kids-footwear-hero.png",
      "/projects/leatherkart-ecommerce/06-product-categories-grid.png",
      "/projects/leatherkart-ecommerce/07-womens-tote-new-arrivals.png",
      "/projects/leatherkart-ecommerce/08-our-products-carousel.png",
    ],
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
