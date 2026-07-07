"use client";

import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";

const SERVICES = [
  {
    icon: "cloud",
    color: "#3b82f6",
    title: "SaaS & Web Applications",
    desc: "Full-stack web applications and SaaS platforms built with React/Next.js frontends, Node.js or NestJS backends, PostgreSQL/MongoDB databases, and scalable cloud infrastructure.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Vercel"],
    includes: ["Multi-tenant architecture", "Subscription billing", "Role-based auth", "API integrations", "Admin dashboards"],
  },
  {
    icon: "psychology",
    color: "#8b5cf6",
    title: "AI & Automation Workflows",
    desc: "Integrate large language models, build agentic workflows, and automate repetitive business processes. From simple OpenAI integrations to complex multi-step pipelines.",
    tags: ["OpenAI", "LangChain", "Python", "n8n", "Webhooks"],
    includes: ["LLM-powered features", "Document processing", "Chatbots & copilots", "Data extraction", "Workflow automation"],
  },
  {
    icon: "storefront",
    color: "#10b981",
    title: "E-Commerce & Marketplaces",
    desc: "High-converting e-commerce stores and multi-vendor marketplaces. Custom Shopify themes, WooCommerce setups, or fully bespoke marketplace platforms with payment rails.",
    tags: ["Shopify", "WooCommerce", "Razorpay", "Stripe", "Next.js"],
    includes: ["Product catalogs", "Cart & checkout", "Payment gateway", "Order management", "Vendor portals"],
  },
  {
    icon: "phone_iphone",
    color: "#f59e0b",
    title: "Mobile Applications",
    desc: "Cross-platform mobile apps using React Native. One codebase, two stores — iOS and Android. From MVP to Play Store / App Store submission and beyond.",
    tags: ["React Native", "Expo", "TypeScript", "Firebase", "Redux"],
    includes: ["iOS & Android", "Push notifications", "Offline support", "API integration", "App store deploy"],
  },
  {
    icon: "web",
    color: "#06b6d4",
    title: "WordPress & CMS Development",
    desc: "Custom WordPress themes, Elementor Pro designs, ACF-powered data structures, and WooCommerce integrations. Fast, SEO-ready, and easy to manage in-house.",
    tags: ["WordPress", "Elementor", "ACF", "WooCommerce", "PHP"],
    includes: ["Custom themes", "Page builder setup", "Speed optimisation", "SEO on-page", "CMS training"],
  },
  {
    icon: "api",
    color: "#ef4444",
    title: "APIs & Backend Systems",
    desc: "RESTful and GraphQL APIs, microservices, background job processors, webhooks, and integrations with third-party services. Built with observability and scalability in mind.",
    tags: ["NestJS", "Express", "GraphQL", "Bull/BullMQ", "Redis"],
    includes: ["REST & GraphQL APIs", "Auth & permissions", "Background jobs", "Webhooks & events", "Rate limiting"],
  },
];

export function ServicesGrid() {
  return (
    <section id="capabilities" className="scroll-mt-28 py-20 sm:py-24">
      <div className="site-container">
        <div className="mb-12">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b00]/80">Capabilities</p>
          <h2 className="font-[family-name:var(--font-family-display)] text-3xl font-bold text-white sm:text-4xl">
            Core services
          </h2>
          <p className="mt-3 text-[14px] text-white/45">
            Everything you need to take a product from concept to scaled production.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/10 hover:bg-white/[0.035]"
            >
              {/* top accent */}
              <div
                className="mb-5 h-0.5 w-10 rounded-full transition-all group-hover:w-16"
                style={{ background: svc.color }}
              />
              {/* icon */}
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: `${svc.color}18` }}
              >
                <MaterialIcon name={svc.icon} className="!text-[20px]" style={{ color: svc.color }} />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-white/90">{svc.title}</h3>
              <p className="mb-5 flex-1 text-[12.5px] leading-relaxed text-white/45">{svc.desc}</p>

              {/* includes */}
              <ul className="mb-5 space-y-1.5">
                {svc.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[12px] text-white/50">
                    <span className="h-1 w-1 rounded-full" style={{ background: svc.color }} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* tags */}
              <div className="flex flex-wrap gap-1.5">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border px-2 py-0.5 font-mono text-[10px]"
                    style={{ borderColor: `${svc.color}25`, color: `${svc.color}99` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
