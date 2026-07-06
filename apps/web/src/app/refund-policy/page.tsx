import { LegalPageLayout, LEGAL_RELATED_LINKS } from "@/components/legal/LegalPageLayout";

export const metadata = {
  title: "Refund Policy — Codeebe",
  description: "Refund policy for Codeebe website, software, and digital marketing services.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      badge="Legal"
      title="Refund Policy"
      lastUpdated="July 2026"
      intro={[
        "At Codeebe, every website, software application, and digital solution is custom-built according to client requirements.",
        "Due to the nature of our services, refund eligibility is limited.",
      ]}
      sections={[
        {
          title: "Website Development Projects",
          content: [
            {
              type: "paragraph",
              text: "Once project work has commenced, payments become non-refundable.",
            },
            { type: "paragraph", text: "This includes:" },
            {
              type: "list",
              list: {
                items: [
                  "Research",
                  "Planning",
                  "Wireframing",
                  "UI/UX Design",
                  "Development",
                  "Testing",
                ],
              },
            },
          ],
        },
        {
          title: "Software Development Projects",
          content: [
            {
              type: "paragraph",
              text: "Custom software development involves resource allocation and dedicated development time.",
            },
            {
              type: "paragraph",
              text: "Payments made toward software projects are generally non-refundable after project initiation.",
            },
          ],
        },
        {
          title: "Digital Marketing Services",
          content: [
            { type: "paragraph", text: "Fees paid for:" },
            {
              type: "list",
              list: {
                items: [
                  "Meta Ads Management",
                  "Google Ads Management",
                  "SEO",
                  "Consulting",
                ],
              },
            },
            {
              type: "paragraph",
              text: "are non-refundable once service delivery has begun.",
            },
            {
              type: "paragraph",
              text: "Advertising spend paid directly to advertising platforms is non-refundable.",
            },
          ],
        },
        {
          title: "Eligible Refund Situations",
          content: [
            { type: "paragraph", text: "Refunds may be considered only if:" },
            {
              type: "list",
              list: {
                items: [
                  "Payment was made accidentally",
                  "Duplicate payment occurred",
                  "Work has not yet commenced",
                ],
              },
            },
            {
              type: "paragraph",
              text: "Approved refunds may take 7–14 business days to process.",
            },
          ],
        },
        {
          title: "Project Cancellation",
          content: [
            {
              type: "paragraph",
              text: "Clients may request project cancellation in writing.",
            },
            { type: "paragraph", text: "In such cases:" },
            {
              type: "list",
              list: {
                items: [
                  "Completed work will be billed",
                  "Remaining unused project balance may be reviewed",
                  "Domain, hosting, plugin, and third-party costs are non-refundable",
                ],
              },
            },
          ],
        },
        {
          title: "Non-Refundable Items",
          content: [
            { type: "paragraph", text: "The following are non-refundable:" },
            {
              type: "list",
              list: {
                items: [
                  "Completed work",
                  "Approved designs",
                  "Development milestones",
                  "Consulting sessions",
                  "Domain purchases",
                  "Hosting fees",
                  "Premium plugins",
                  "Third-party software licenses",
                ],
              },
            },
          ],
        },
      ]}
      relatedLinks={LEGAL_RELATED_LINKS.filter((l) => l.href !== "/refund-policy")}
    />
  );
}
