import { LegalPageLayout, LEGAL_RELATED_LINKS } from "@/components/legal/LegalPageLayout";

export const metadata = {
  title: "Terms & Conditions — Codeebe",
  description: "Terms and conditions governing the use of Codeebe's website and services.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      badge="Legal"
      title="Terms & Conditions"
      lastUpdated="July 2026"
      intro={[
        "These Terms & Conditions govern the use of Codeebe's website and services.",
        "By accessing our website or engaging our services, you agree to these terms.",
      ]}
      sections={[
        {
          title: "Services",
          content: [
            { type: "paragraph", text: "Codeebe provides:" },
            {
              type: "list",
              list: {
                items: [
                  "Website Development",
                  "Web Applications",
                  "Software Development",
                  "Mobile App Development",
                  "AI Solutions",
                  "Automation Solutions",
                  "UI/UX Design",
                  "Branding Services",
                  "Digital Marketing",
                  "IT Consulting",
                ],
              },
            },
          ],
        },
        {
          title: "Project Engagement",
          content: [
            { type: "paragraph", text: "A project begins only after:" },
            {
              type: "list",
              list: {
                items: ["Scope confirmation", "Quotation approval", "Advance payment (if applicable)"],
              },
            },
          ],
        },
        {
          title: "Client Responsibilities",
          content: [
            { type: "paragraph", text: "Clients agree to:" },
            {
              type: "list",
              list: {
                items: [
                  "Provide necessary content",
                  "Provide timely feedback",
                  "Review deliverables promptly",
                  "Make payments as agreed",
                  "Ensure legal ownership of provided materials",
                ],
              },
            },
            {
              type: "paragraph",
              text: "Delays in content or approvals may impact project timelines.",
            },
          ],
        },
        {
          title: "Intellectual Property",
          content: [
            { type: "paragraph", text: "Until full payment is received:" },
            {
              type: "list",
              list: {
                items: ["Source files", "Designs", "Code", "Creative assets"],
              },
            },
            { type: "paragraph", text: "remain the property of Codeebe." },
            {
              type: "paragraph",
              text: "Ownership transfers upon final payment unless otherwise agreed in writing.",
            },
          ],
        },
        {
          title: "Project Revisions",
          content: [
            {
              type: "paragraph",
              text: "Revision limits are defined in the project proposal.",
            },
            {
              type: "paragraph",
              text: "Additional revisions beyond agreed scope may incur extra charges.",
            },
          ],
        },
        {
          title: "Third-Party Services",
          content: [
            { type: "paragraph", text: "Projects may involve:" },
            {
              type: "list",
              list: {
                items: ["Domains", "Hosting", "APIs", "Plugins", "Third-party software"],
              },
            },
            {
              type: "paragraph",
              text: "Associated fees are separate from development charges unless specifically included.",
            },
          ],
        },
        {
          title: "Limitation Of Liability",
          content: [
            { type: "paragraph", text: "Codeebe shall not be liable for:" },
            {
              type: "list",
              list: {
                items: [
                  "Business losses",
                  "Revenue losses",
                  "Data loss",
                  "Indirect damages",
                  "Downtime caused by third-party services",
                ],
              },
            },
            {
              type: "paragraph",
              text: "Maximum liability shall not exceed the amount paid by the client for the specific project.",
            },
          ],
        },
        {
          title: "Service Refusal",
          content: [
            {
              type: "paragraph",
              text: "Codeebe reserves the right to refuse service to any individual or organization at its discretion.",
            },
          ],
        },
        {
          title: "Modifications",
          content: [
            {
              type: "paragraph",
              text: "We may modify these Terms & Conditions at any time.",
            },
            {
              type: "paragraph",
              text: "Continued use of our services constitutes acceptance of any updates.",
            },
          ],
        },
      ]}
      relatedLinks={LEGAL_RELATED_LINKS.filter((l) => l.href !== "/terms")}
    />
  );
}
