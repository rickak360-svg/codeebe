import { LegalPageLayout, LEGAL_RELATED_LINKS } from "@/components/legal/LegalPageLayout";

export const metadata = {
  title: "Privacy Policy — Codeebe",
  description: "How Codeebe collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      badge="Legal"
      title="Privacy Policy"
      lastUpdated="July 2026"
      intro={[
        'Welcome to Codeebe ("Company", "we", "our", or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or communicate with us.',
        "By accessing our website and services, you agree to the practices described in this Privacy Policy.",
      ]}
      sections={[
        {
          title: "Information We Collect",
          content: [
            { type: "paragraph", text: "We may collect the following information:" },
            {
              type: "list",
              list: {
                label: "Personal Information",
                items: [
                  "Full Name",
                  "Email Address",
                  "Phone Number",
                  "Company Name",
                  "Business Information",
                  "Billing Information",
                ],
              },
            },
            {
              type: "list",
              list: {
                label: "Technical Information",
                items: [
                  "IP Address",
                  "Browser Type",
                  "Device Information",
                  "Operating System",
                  "Website Usage Data",
                ],
              },
            },
            {
              type: "list",
              list: {
                label: "Information Submitted Through Forms",
                items: [
                  "When you contact us through forms, WhatsApp, email, or consultation requests, we may collect information relevant to your inquiry.",
                ],
              },
            },
          ],
        },
        {
          title: "How We Use Your Information",
          content: [
            { type: "paragraph", text: "We use collected information to:" },
            {
              type: "list",
              list: {
                items: [
                  "Provide our services",
                  "Respond to inquiries",
                  "Manage projects",
                  "Process payments",
                  "Improve website performance",
                  "Enhance customer experience",
                  "Send service-related communications",
                  "Conduct internal analytics",
                  "Comply with legal obligations",
                ],
              },
            },
          ],
        },
        {
          title: "Data Protection",
          content: [
            {
              type: "paragraph",
              text: "We implement reasonable security measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.",
            },
            {
              type: "paragraph",
              text: "However, no internet transmission or storage system can be guaranteed as 100% secure.",
            },
          ],
        },
        {
          title: "Sharing of Information",
          content: [
            {
              type: "paragraph",
              text: "We do not sell, rent, or trade personal information.",
            },
            { type: "paragraph", text: "We may share information with:" },
            {
              type: "list",
              list: {
                items: [
                  "Hosting providers",
                  "Payment processors",
                  "CRM systems",
                  "Legal authorities when required by law",
                  "Service partners involved in project delivery",
                ],
              },
            },
          ],
        },
        {
          title: "Cookies",
          content: [
            { type: "paragraph", text: "Our website may use cookies to:" },
            {
              type: "list",
              list: {
                items: [
                  "Improve user experience",
                  "Analyze website traffic",
                  "Remember preferences",
                  "Measure marketing effectiveness",
                ],
              },
            },
            {
              type: "paragraph",
              text: "Users may disable cookies through browser settings.",
            },
          ],
        },
        {
          title: "Third-Party Services",
          content: [
            {
              type: "paragraph",
              text: "Our website may contain links to third-party websites including:",
            },
            {
              type: "list",
              list: {
                items: ["Google", "Meta", "LinkedIn", "YouTube", "Payment gateways"],
              },
            },
            {
              type: "paragraph",
              text: "We are not responsible for the privacy practices of third-party websites.",
            },
          ],
        },
        {
          title: "Data Retention",
          content: [
            {
              type: "paragraph",
              text: "We retain personal information only for as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements.",
            },
          ],
        },
        {
          title: "Changes To This Policy",
          content: [
            {
              type: "paragraph",
              text: "Codeebe reserves the right to update this Privacy Policy at any time without prior notice.",
            },
          ],
        },
        {
          title: "Contact Information",
          content: [
            { type: "paragraph", text: "For privacy-related concerns, contact:" },
            {
              type: "list",
              list: {
                items: ["Email: hello@codeebe.com", "Website: www.codeebe.com"],
              },
            },
          ],
        },
      ]}
      relatedLinks={LEGAL_RELATED_LINKS.filter((l) => l.href !== "/privacy-policy")}
    />
  );
}
