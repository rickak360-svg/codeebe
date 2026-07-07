import Link from "next/link";

type LegalList = { label?: string; items: string[] };

type LegalSection = {
  title: string;
  content: Array<{ type: "paragraph"; text: string } | { type: "list"; list: LegalList }>;
};

type LegalPageLayoutProps = {
  badge: string;
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
  relatedLinks?: { label: string; href: string }[];
};

export function LegalPageLayout({
  badge,
  title,
  lastUpdated,
  intro,
  sections,
  relatedLinks,
}: LegalPageLayoutProps) {
  return (
    <div className="relative page-below-header bg-[#0a0a0a] pb-16 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#ff6b00]/[0.04] blur-[150px]" />
        <div className="absolute -left-40 bottom-40 h-[400px] w-[400px] rounded-full bg-[#ff6b00]/[0.03] blur-[120px]" />
      </div>

      <div className="floating-header-wrap relative pt-6 sm:pt-8">
        <div className="w-full px-4 sm:px-5 lg:px-6">
          <div className="mb-8 sm:mb-10">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff6b00]/10 ring-1 ring-[#ff6b00]/20">
                <span className="material-symbols-outlined !text-[16px] text-[#ff6b00]">gavel</span>
              </div>
              <span className="text-sm font-semibold uppercase tracking-widest text-[#ff6b00]">{badge}</span>
            </div>
            <h1 className="font-[family-name:var(--font-family-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-sm text-white/35">Last Updated: {lastUpdated}</p>
          </div>

          <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-8 lg:p-10">
            <div className="space-y-4 text-[15px] leading-relaxed text-white/60">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="mb-3 text-base font-semibold text-white sm:mb-4 sm:text-lg">{section.title}</h2>
                  {section.content.map((block, index) =>
                    block.type === "paragraph" ? (
                      <p
                        key={`${section.title}-p-${index}`}
                        className="mb-3 text-[14px] leading-relaxed text-white/60 sm:text-[15px]"
                      >
                        {block.text}
                      </p>
                    ) : (
                      <div key={`${section.title}-l-${index}`} className="mb-3">
                        {block.list.label && (
                          <p className="mb-2 text-[13px] font-medium text-white/70 sm:text-[14px]">{block.list.label}</p>
                        )}
                        <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-white/55 sm:text-[15px]">
                          {block.list.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
                </section>
              ))}
            </div>

            {relatedLinks && relatedLinks.length > 0 && (
              <div className="mt-10 border-t border-white/[0.06] pt-6 sm:mt-12 sm:pt-8">
                <p className="mb-4 text-sm font-medium text-white/50">Related policies</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[12px] text-white/55 transition-colors hover:border-[#ff6b00]/30 hover:text-[#ff6b00] sm:px-4 sm:text-[13px]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const LEGAL_RELATED_LINKS = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];
