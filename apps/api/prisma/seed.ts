import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const showcaseProjects = [
  {
    slug: 'cricrumble',
    name: 'CricRumble',
    category: 'Sports / Gaming Platform',
    shortDescription:
      'Cricket-focused engagement platform with live updates, contests, and community features.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
    overview:
      'CricRumble is a cricket fan engagement product designed to keep users active around matches, leagues, and fantasy-style interactions.',
    problemSolved:
      'Fans needed a single destination for match context, participation, and real-time engagement instead of scattered social feeds.',
    keyFeatures: [
      'Live match widgets',
      'User profiles & leaderboards',
      'Contest participation',
      'Admin content management',
      'Notification-ready architecture',
    ],
    businessValue:
      'Increased session time and repeat visits through structured engagement loops around cricket events.',
    costRange: '₹3,00,000 – ₹8,00,000',
    sortOrder: 0,
  },
  {
    slug: 'influventure',
    name: 'Influventure',
    category: 'Influencer / Campaign Platform',
    shortDescription:
      'Platform connecting brands with influencers for campaign discovery and collaboration.',
    techStack: ['React', 'NestJS', 'PostgreSQL', 'AWS'],
    overview:
      'Influventure streamlines influencer marketing workflows from discovery to campaign tracking.',
    problemSolved:
      'Brands struggled to coordinate influencer outreach, deliverables, and reporting in spreadsheets and DMs.',
    keyFeatures: [
      'Influencer profiles',
      'Campaign listings',
      'Brand dashboards',
      'Application workflows',
      'Analytics summaries',
    ],
    businessValue:
      'Faster campaign launches and clearer ROI visibility for marketing teams.',
    costRange: '₹2,50,000 – ₹7,00,000',
    sortOrder: 1,
  },
  {
    slug: 'scanpubs',
    name: 'Scanpubs',
    category: 'Publishing / QR Platform',
    shortDescription:
      'QR-based publishing solution for digital content access and publication management.',
    techStack: ['Next.js', 'API', 'MongoDB', 'Cloud Storage'],
    overview:
      'Scanpubs helps publishers bridge print and digital with scannable experiences and managed content.',
    problemSolved:
      'Publishers needed a simple way to attach rich digital experiences to physical materials.',
    keyFeatures: [
      'QR generation & tracking',
      'Content library',
      'Publisher admin',
      'Access analytics',
      'Multi-format support',
    ],
    businessValue:
      'Measurable engagement from print campaigns and reduced friction for readers.',
    costRange: '₹1,50,000 – ₹5,00,000',
    sortOrder: 2,
  },
  {
    slug: 'shubh-safar-car-rental',
    name: 'Shubh Safar Car Rental',
    category: 'Booking / Rental',
    shortDescription:
      'Car rental booking website with fleet showcase, inquiries, and admin-friendly content.',
    techStack: ['WordPress', 'Custom Theme', 'PHP', 'MySQL'],
    overview:
      'Shubh Safar presents rental fleets online and captures booking inquiries with a trustworthy brand experience.',
    problemSolved:
      'Manual phone-only bookings limited reach and made fleet availability hard to communicate.',
    keyFeatures: [
      'Fleet catalog',
      'Booking inquiry forms',
      'Location & pricing pages',
      'SEO-ready structure',
      'Mobile-responsive UI',
    ],
    businessValue:
      'More qualified inbound leads and 24/7 visibility for rental services.',
    costRange: '₹60,000 – ₹2,00,000',
    sortOrder: 3,
  },
  {
    slug: 'weboku-agency',
    name: 'Weboku Agency',
    category: 'Agency Website',
    shortDescription:
      'Premium agency portfolio site showcasing services, work, and lead capture.',
    techStack: ['Next.js', 'Tailwind CSS', 'CMS-ready'],
    overview:
      'Weboku Agency’s site positions the brand as a modern digital partner with clear service positioning.',
    problemSolved:
      'The agency needed a credible web presence that converts visitors into consultation requests.',
    keyFeatures: [
      'Service pages',
      'Portfolio grid',
      'Contact & CTA flows',
      'Performance-optimized pages',
      'Brand-focused design system',
    ],
    businessValue:
      'Stronger inbound pipeline and improved trust during sales conversations.',
    costRange: '₹25,000 – ₹80,000',
    sortOrder: 4,
  },
  {
    slug: 'sthulas-ecommerce',
    name: 'Sthulas eCommerce',
    category: 'eCommerce',
    shortDescription:
      'Online store for product catalog, cart, and streamlined checkout experience.',
    techStack: ['WooCommerce', 'WordPress', 'Payment Gateway'],
    overview:
      'Sthulas eCommerce enables product sales online with catalog management and order workflows.',
    problemSolved:
      'Retail needed to move beyond offline-only sales with a manageable online storefront.',
    keyFeatures: [
      'Product catalog',
      'Cart & checkout',
      'Order notifications',
      'Category management',
      'Mobile shopping UX',
    ],
    businessValue:
      'Expanded sales channels and easier inventory presentation for customers.',
    costRange: '₹50,000 – ₹1,50,000',
    sortOrder: 5,
  },
  {
    slug: 'leatherkart-ecommerce',
    name: 'LeatherKart eCommerce',
    category: 'eCommerce / Fashion',
    shortDescription:
      'Leather goods store with rich product presentation and conversion-focused UX.',
    techStack: ['Shopify / WooCommerce', 'Custom UI', 'SEO'],
    overview:
      'LeatherKart showcases premium leather products with imagery-led pages and smooth purchase flows.',
    problemSolved:
      'Generic templates failed to reflect product quality and brand positioning.',
    keyFeatures: [
      'Product galleries',
      'Variant selection',
      'Promotions support',
      'Trust elements (reviews, policies)',
      'SEO product pages',
    ],
    businessValue:
      'Higher perceived brand value and improved conversion on high-ticket items.',
    costRange: '₹80,000 – ₹2,00,000',
    sortOrder: 6,
  },
  {
    slug: 'dream-drive-car-rental',
    name: 'Dream Drive Car Rental',
    category: 'Booking / Rental',
    shortDescription:
      'Car rental platform with booking flows, vehicle listings, and customer-friendly UX.',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    overview:
      'Dream Drive offers end-to-end rental discovery with availability-focused booking journeys.',
    problemSolved:
      'Customers wanted instant clarity on vehicles, pricing, and booking steps without back-and-forth calls.',
    keyFeatures: [
      'Vehicle search & filters',
      'Booking calendar',
      'Admin fleet management',
      'Customer accounts',
      'Email confirmations',
    ],
    businessValue:
      'Reduced manual coordination and faster booking completion.',
    costRange: '₹1,00,000 – ₹3,00,000',
    sortOrder: 7,
  },
];

const teamMembers = [
  {
    name: 'Rahul Sharma',
    role: 'Founder & Lead Engineer',
    bio: 'Full-stack product engineer focused on SaaS, marketplaces, and scalable platform architecture.',
    sortOrder: 0,
  },
  {
    name: 'Priya Mehta',
    role: 'Product & Delivery Lead',
    bio: 'Turns client requirements into clear roadmaps, milestones, and shipped outcomes.',
    sortOrder: 1,
  },
  {
    name: 'Arjun Patel',
    role: 'Senior Frontend Engineer',
    bio: 'Builds fast, polished interfaces with React, Next.js, and design-system discipline.',
    sortOrder: 2,
  },
  {
    name: 'Sneha Reddy',
    role: 'Backend & DevOps Engineer',
    bio: 'Designs APIs, databases, and cloud deployments that stay reliable under growth.',
    sortOrder: 3,
  },
];

const serviceCards = [
  {
    kind: 'card' as const,
    title: 'Business Websites',
    description:
      'Professional sites that build trust and convert visitors into leads.',
    sortOrder: 0,
  },
  {
    kind: 'card' as const,
    title: 'SaaS MVPs',
    description:
      'Launch-ready products with auth, dashboards, and scalable foundations.',
    sortOrder: 1,
  },
  {
    kind: 'card' as const,
    title: 'Marketplaces',
    description:
      'Multi-vendor platforms with listings, payments, and admin controls.',
    sortOrder: 2,
  },
  {
    kind: 'card' as const,
    title: 'eCommerce',
    description:
      'Online stores with catalog, checkout, and order management.',
    sortOrder: 3,
  },
  {
    kind: 'card' as const,
    title: 'Automation Workflows',
    description:
      'Connect tools, reduce manual work, and streamline operations.',
    sortOrder: 4,
  },
  {
    kind: 'card' as const,
    title: 'Custom Dashboards',
    description:
      'Internal tools and CRM-style panels tailored to your workflow.',
    sortOrder: 5,
  },
];

const trustBadges = [
  'SaaS Platforms',
  'Marketplaces',
  'WordPress',
  'eCommerce',
  'Automation',
  'Admin Dashboards',
  'Cloud Deployment',
];

async function main() {
  for (const project of showcaseProjects) {
    await prisma.showcaseProject.upsert({
      where: { slug: project.slug },
      create: { ...project, published: true },
      update: project,
    });
  }
  console.log(`Seeded ${showcaseProjects.length} showcase projects.`);

  const existingTeam = await prisma.teamMember.count();
  if (existingTeam === 0) {
    for (const member of teamMembers) {
      await prisma.teamMember.create({
        data: { ...member, published: true },
      });
    }
    console.log(`Seeded ${teamMembers.length} team members.`);
  } else {
    console.log(`Skipped team seed (${existingTeam} members already exist).`);
  }

  const existingServices = await prisma.serviceItem.count();
  if (existingServices === 0) {
    for (const card of serviceCards) {
      await prisma.serviceItem.create({
        data: { ...card, published: true },
      });
    }
    for (const [i, label] of trustBadges.entries()) {
      await prisma.serviceItem.create({
        data: {
          kind: 'badge',
          title: label,
          description: '',
          published: true,
          sortOrder: i,
        },
      });
    }
    console.log(
      `Seeded ${serviceCards.length} service cards and ${trustBadges.length} trust badges.`,
    );
  } else {
    console.log(`Skipped services seed (${existingServices} items already exist).`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
