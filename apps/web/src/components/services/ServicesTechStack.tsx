"use client";

import { motion } from "framer-motion";

const TECH = [
  { group: "Frontend",    items: ["Next.js", "React", "React Native", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { group: "Backend",     items: ["NestJS", "Node.js", "Express", "GraphQL", "REST APIs", "WebSockets"] },
  { group: "Database",    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma", "Mongoose"] },
  { group: "Cloud & CI",  items: ["Vercel", "AWS", "Railway", "Docker", "GitHub Actions", "Cloudflare"] },
  { group: "CMS & E-com", items: ["WordPress", "Shopify", "WooCommerce", "Contentful", "Sanity", "Strapi"] },
  { group: "AI & Tools",  items: ["OpenAI API", "LangChain", "n8n", "Razorpay", "Stripe", "Nodemailer"] },
];

export function ServicesTechStack() {
  return (
    <section id="tech" className="scroll-mt-28 border-y border-white/[0.06] bg-white/[0.015] py-20 sm:py-24">
      <div className="site-container">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b00]/80">Tech Stack</p>
          <h2 className="font-[family-name:var(--font-family-display)] text-3xl font-bold text-white sm:text-4xl">
            Tools we master
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TECH.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.06, duration: 0.38 }}
              className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-5"
            >
              <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.15em] text-[#ff6b00]/70">
                {group.group}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-white/55"
                  >
                    {item}
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
