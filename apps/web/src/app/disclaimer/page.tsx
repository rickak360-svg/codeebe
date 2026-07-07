import { LegalPageLayout, LEGAL_RELATED_LINKS } from "@/components/legal/LegalPageLayout";

export const metadata = {
  title: "Disclaimer — Codeebe",
  description: "Disclaimer regarding Codeebe technology and digital services outcomes.",
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      badge="Legal"
      title="Disclaimer"
      lastUpdated="July 2026"
      intro={[
        "Codeebe provides professional technology and digital services.",
        "While we strive to deliver high-quality results, we do not guarantee:",
      ]}
      sections={[
        {
          title: "No Guaranteed Outcomes",
          content: [
            {
              type: "list",
              list: {
                items: [
                  "Specific sales figures",
                  "Revenue increases",
                  "Search engine rankings",
                  "Lead volume",
                  "Advertising performance",
                  "Business growth outcomes",
                ],
              },
            },
            {
              type: "paragraph",
              text: "Results depend on various factors including market conditions, competition, business strategy, and client implementation.",
            },
            {
              type: "paragraph",
              text: "Any examples, case studies, projections, or testimonials presented on our website are for informational purposes only and should not be interpreted as guarantees of future performance.",
            },
          ],
        },
      ]}
      relatedLinks={LEGAL_RELATED_LINKS.filter((l) => l.href !== "/disclaimer")}
    />
  );
}
